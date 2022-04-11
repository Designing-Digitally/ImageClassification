//Imports
import p5 from 'p5';
import ml5 from 'ml5';
import Puffin from './images/puffin.jpg';
import Penguin from './images/penguin.jpg';
import Toucan from './images/toucan.jpg';

/**
* App is a p5 construct declaration of a new instance of p5. 
* p5 uses a lot of ES6 related syntax such as arrow functions, promises and async functions.
* @author Brent Williams <brent.williams@ddincmail.org>
*/

const App = (App) => 
{
    //Image Declarations
    let puffin;
    let toucan;
    let penguin;

    //Variables
    let videoFeed;
    let item = '';
    let confidence = '';

    /**
    * p5JS Library function
    * It's used to define initial environment properties such as screen size and background 
    * color and to load media such as images and fonts as the program starts. There can only 
    * be one setup() function for each program and it shouldn't be called again after its initial execution..
    */
    
    App.setup = () =>
    {
        App.createCanvas(500,500);
        puffin = App.createImg(Puffin, () => 
        {
            App.image(puffin, 0, 0, App.width,App.height);
        });
        puffin.hide();
        App.mobileNet = ml5.imageClassifier('MobileNet', MobileNetReady);
        //videoFeed = App.createCapture(App.VIDEO, CaptureReady);
       // videoFeed.hide();
        App.background(0);
    }


    /**
    * p5JS Library function
    * Called directly after setup(), the draw() function continuously executes the lines 
    * of code contained inside its block until the program is stopped or noLoop() is called.
    */

    App.draw = () =>
    {
        App.fill(255);

        App.textSize(24);
        App.text(item, 10, 20, App.height-20)

        App.textSize(16);
        App.text(confidence, 10, App.height-20)
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
        App.mobileNet.classify(puffin,1,ResultsReturned);
    }

    /**
    * Returns ML Models prediction results.
    *
    * @param {err} Any errors that arise from the prediction.
    * @param {results} Predicted Results.
    */
    
    function ResultsReturned(err, results) 
    {
        let split = undefined;

        if(err)
        {
            console.error(err);
        }
        else
        {
            console.log(results);

            item = results[0].label;
            confidence = `${results[0].confidence*100}%`;
        }
    }

    /**
    * Callback functions that runs when the video capture has successfully loaded.
    */
    
    function CaptureReady()
    {
        //Mobile Net ML Model Declaration
        App.mobileNet = ml5.imageClassifier('MobileNet', videoFeed, MobileNetReady);
    }

    
}

let myp5 = new p5(App);