// CITATION https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/
// I used this algorithm linked above while making small modifications to fit my game

const Simple1DNoiseGenerator = function():generator {
    const MAX_VERTICES = 256;
    const MAX_VERTICES_MASK = MAX_VERTICES -1;
    let amplitude = 1;
    let scale = .02;

    const r:number[] = [];

    for (let i = 0; i < MAX_VERTICES; i++) {
        r.push(Math.random());
    }

    const getVal = function( x:number ):number{
        const scaledX = x * scale;
        const xFloor = Math.floor(scaledX);
        const t = scaledX - xFloor;
        const tRemapSmoothstep = t * t * ( 3 - 2 * t );

        const xMin = xFloor % MAX_VERTICES_MASK;
        const xMax = ( xMin + 1 ) % MAX_VERTICES_MASK;

        const y = linearInterpolation( r[ xMin ], r[ xMax ], tRemapSmoothstep );

        //return y * amplitude;
        return Math.floor(y * amplitude * 100)
    };

    /**
    * Linear interpolation function.
    * @param a The lower integer value
    * @param b The upper integer value
    * @param t The value between the two
    * @returns {number}
    */
    const linearInterpolation = function(a:number, b:number, t:number ):number{
        return a * ( 1 - t ) + b * t;
    };

    // return the API
    return ({
        getVal: getVal,
        setAmplitude: function(newAmplitude:number) {
            amplitude = newAmplitude;
        },
        setScale: function(newScale:number) {
            scale = newScale;
        }
    });
};

type generator = {
    getVal:(x:number)=>number;
    setAmplitude: (newAmplitude:number)=> void;
    setScale: (newScale:number)=>void;
}

export {Simple1DNoiseGenerator, generator};

/*
* ------- Example -------
* generator = Simple1DNoiseGenerator();
* y = generator.getVal(x);
*/
