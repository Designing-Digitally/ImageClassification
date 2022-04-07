import p5 from 'p5';

const App = (sketch) => 
{
    sketch.setup = () =>
    {
        sketch.createCanvas(640,400);
    }

    sketch.draw = () => 
    {
        sketch.background(0);
    }
}

let myp5 = new p5(App);