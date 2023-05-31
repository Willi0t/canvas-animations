import React, { useEffect, useRef } from "react";

function Test() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const circleArrayRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pen = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#E37B40", "#46B29D", "#DE5B49", "#324D5C", "#F0CA4D"];

    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouseRef.current = { x: false, y: false };
    };

    const Circle = function (x, y, r, dx, dy) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.draw = function () {
        pen.beginPath();
        pen.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        pen.fillStyle = this.color;
        pen.fill();
      };
      this.update = function () {
        this.x = this.x + dx;
        this.y = this.y + dy;
        if (
          mouseRef.current.x - this.x < 100 &&
          mouseRef.current.x - this.x > -100 &&
          mouseRef.current.y - this.y < 100 &&
          mouseRef.current.y - this.y > -100
        ) {
          if (this.r < 30) {
            this.r += 1;
          }
        } else {
          if (this.r > 0) {
            this.r -= 1;
          }
        }
        this.draw();
      };
    };

    const beginApp = () => {
      requestAnimationFrame(beginApp);
      pen.clearRect(0, 0, canvas.width, canvas.height);
      if (mouseRef.current) {
        const x = mouseRef.current.x;
        const y = mouseRef.current.y;
        const r = 5;
        const dx = (Math.random() - 0.5) * 5;
        const dy = (Math.random() - 0.5) * 5;
        circleArrayRef.current.push(new Circle(x, y, r, dx, dy));
      }

      for (let i = 0; i < circleArrayRef.current.length; i++) {
        if (circleArrayRef.current[i].r <= 0) {
          circleArrayRef.current.splice(i, 1);
        }
        circleArrayRef.current[i].update();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    beginApp();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

export default Test;
