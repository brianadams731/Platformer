interface GivesPostition{
    getPosition():position;
}

interface position {
    x:number,
    y:number,
    width:number,
    height:number
}

export {GivesPostition,position};

