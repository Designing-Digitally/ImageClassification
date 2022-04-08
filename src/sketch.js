//Imports
import p5 from 'p5';
import ml5 from 'ml5';
import Puffin from './images/puffin.jpg';
import Penguin from './images/penguin.jpg';
import Toucan from './images/toucan.jpg';

//Image Declarations
let puffin;
let toucan;
let penguin;

/**
* App is a p5 construct declaration of a new instance of p5. 
* p5 uses a lot of ES6 related syntax such as arrow functions, promises and async functions.
* @author Brent Williams <brent.williams@ddincmail.org>
*/

const App = (App) => 
{
    //Mobile Net ML Model Declaration
    App.mobileNet = ml5.imageClassifier('MobileNet', MobileNetReady);

    /**
    * p5JS Initialization Function -- fn() setup is ran automatically by p5JS.
    */
    
    App.setup = () =>
    {
        App.createCanvas(400,400);
        toucan = App.createImg(Toucan, () => 
        {
            App.image(toucan, 0, 0, App.width, App.height);
        });
        toucan.hide();
        App.background(0);
    }

    /**
    * Function Callback when Mobile Net ML Model is ready.
    *
    * @return {log} Returns logs ml5 version # and statement saying its ready.
    */
    
    function MobileNetReady() 
    {
        console.group('ml5 Information');
        console.log(`ml5 Version: ${ml5.version}`);
        console.log('MobileNet is ready.');

        App.mobileNet.classify(toucan,ResultsReturned);
    }

    /**
    * Returns ML Models prediction results.
    *
    * @param {err} Any errors that arise from the prediction.
    * @param {results} Predicted Results.
    */
    
    function ResultsReturned(err, results) 
    {
        if(err)
        {
            console.error(error);
        }
        else
        {
            console.log(results);
        }
    }
}

let myp5 = new p5(App);