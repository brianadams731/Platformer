interface dimensions{
    x:number
    y:number
    height:number
    width:number
}

interface GivesDimensions{
    getDimensions():dimensions;
}

export {dimensions,GivesDimensions}