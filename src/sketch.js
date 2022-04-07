import p5 from 'p5';

const Canvas = (sketch) => 
{
    sketch.setup = () =>
    {
        sketch.createCanvas(1000,1000);
    }

    sketch.draw = () => 
    {
        sketch.background(0);
    }
}

let myp5 = new p5(Canvas);