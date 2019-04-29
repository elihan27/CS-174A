
var canvas;
var gl;
var pcBuffer;
var pvBuffer;
var ccBuffer;
var cvBuffer;

var vColor;
var vPosition;

var pyramidVertices  = 18;//36;
                                   // For each face of the cube, make two triangles of three vertices each:
var pyramidPositions = [
    vec4( -0.5, 0.5, 0.5, 1 ), //1
    vec4( -0.5, -0.5, 0.5, 1 ), //2
    vec4( 0.5, -0.5, 0.5, 1 ), //3
    vec4( -0.5, 0.5, 0.5, 1 ), //4
    vec4( 0.5, -0.5, 0.5, 1 ),//5
    vec4( 0.5, 0.5, 0.5, 1 ),//6


    vec4( -0.5, 0.5, 0.5, 1 ), //1
    vec4( -0.5, -0.5, 0.5, 1 ), //2
    vec4( 0.0, 0.0, 0.0, 1 ),

    vec4( -0.5, 0.5, 0.5, 1 ), //1
    vec4( 0.5, 0.5, 0.5, 1 ),//6
    vec4( 0.0, 0.0, 0.0, 1 ),

    vec4( 0.5, 0.5, 0.5, 1 ),//6
    vec4( 0.5, -0.5, 0.5, 1 ), //3
    vec4( 0.0, 0.0, 0.0, 1 ),

    vec4( 0.5, -0.5, 0.5, 1 ), //3
    vec4( -0.5, -0.5, 0.5, 1 ), //2
    vec4( 0.0, 0.0, 0.0, 1 ),
];

var pyramidColors = [
    vec4( -0.5, 0.5, 0.5, 1 ), //1
    vec4( -0.5, -0.5, 0.5, 1 ), //2
    vec4( 0.5, -0.5, 0.5, 1 ), //3
    vec4( -0.5, 0.5, 0.5, 1 ), //4
    vec4( 0.5, -0.5, 0.5, 1 ),//5
    vec4( 0.5, 0.5, 0.5, 1 ),//6


    vec4( -0.5, 0.5, 0.5, 1 ), //1
    vec4( -0.5, -0.5, 0.5, 1 ), //2
    vec4( 0.0, 0.0, 0.0, 1 ),

    vec4( -0.5, 0.5, 0.5, 1 ), //1
    [ 0.0, 1.0, 0.0, 1.0 ],//6
    [ 0.0, 1.0, 0.0, 1.0 ],

     [ 1.0, 0.0, 0.0, 1.0 ],//6
    vec4( 0.5, -0.5, 0.5, 1 ), //3
     [ 1.0, 0.0, 0.0, 1.0 ],

    vec4( 0.5, -0.5, 0.5, 1 ), //3
    vec4( -0.5, -0.5, 0.5, 1 ), //2
    vec4( 0.0, 0.0, 0.0, 1 )


];

var cubeVertices = 36;

var cubePositions= [
    vec4( -0.5, 0.0, 0.0, 1 ), //1
    vec4( -0.5, -0.5, 0.0, 1 ), //2
    vec4( 0.0, -0.5, 0.0, 1 ), //3
    vec4( -0.5, 0.0, 0.0, 1 ),//4
    vec4( 0.0, -0.5, 0.0, 1 ),//5
    vec4( 0.0, 0.0, 0.0, 1 ),//6

    vec4( 0.0, 0.0, 0.0, 1 ),//7
    vec4( 0.0, -0.5, 0.0, 1 ),//8
    vec4( 0.0, -0.5, -0.5, 1 ),//9
    vec4( 0.0, 0.0, 0.0, 1 ),//10
    vec4( 0.0, -0.5, -0.5, 1 ),  //11  
    vec4( 0.0, 0.0, -0.5, 1 ),//12

    vec4( 0.0, -0.5, 0.0, 1 ),//13
    vec4( -0.5, -0.5, 0.0, 1 ),//14
    vec4( -0.5, -0.5, -0.5, 1 ),//15
    vec4( 0.0, -0.5, 0.0, 1 ),//16
    vec4( -0.5, -0.5, -0.5, 1 ),//17
    vec4( 0.0, -0.5, -0.5, 1 ),//18

    vec4( 0.0, 0.0, -0.5, 1 ),//19
    vec4( -0.5, 0.0, -0.5, 1 ),//20
    vec4( -0.5, 0.0, 0.0, 1 ),//21
    vec4( 0.0, 0.0, -0.5, 1 ),//22
    vec4( -0.5, 0.0, 0.0, 1 ),//23
    vec4( 0.0, 0.0, 0.0, 1 ),//24

    vec4( -0.5, -0.5, -0.5, 1 ),//25
    vec4( -0.5, 0.0, -0.5, 1 ),//26
    vec4( 0.0, 0.0, -0.5, 1 ),//27
    vec4( -0.5, -0.5, -0.5, 1 ),//28
    vec4( 0.0, 0.0, -0.5, 1 ),//29
    vec4( 0.0, -0.5, -0.5, 1 ),//30
    
    vec4( -0.5, 0.0, -0.5, 1 ),//31
    vec4( -0.5, -0.5, -0.5, 1 ),//32
    vec4( -0.5, -0.5, 0.0, 1 ),//33
    vec4( -0.5, 0.0, -0.5, 1 ),//34
    vec4( -0.5, -0.5, 0.0, 1 ),//35
    vec4( -0.5, 0.0, 0.0, 1 )//36
 

];

var cubeColors= [
    [ 1.0, 0.0, 0.0, 1.0 ], // red
    [ 1.0, 0.0, 0.0, 1.0 ],//2
    [ 1.0, 0.0, 0.0, 1.0 ],//3
    [ 1.0, 0.0, 0.0, 1.0 ],//4
    [ 1.0, 0.0, 0.0, 1.0 ],//5
    [ 1.0, 0.0, 0.0, 1.0 ],//6

    [ 1.0, 1.0, 0.0, 1.0 ], // yellow
    [ 1.0, 1.0, 0.0, 1.0 ],//8
    [ 1.0, 1.0, 0.0, 1.0 ],//9
    [ 1.0, 1.0, 0.0, 1.0 ],//10
    [ 1.0, 1.0, 0.0, 1.0 ],//11
    [ 1.0, 1.0, 0.0, 1.0 ],//12

    [ 0.0, 1.0, 0.0, 1.0 ], // green
    [ 0.0, 1.0, 0.0, 1.0 ],//14
    [ 0.0, 1.0, 0.0, 1.0 ],//15
    [ 0.0, 1.0, 0.0, 1.0 ],//16
    [ 0.0, 1.0, 0.0, 1.0 ],//17
    [ 0.0, 1.0, 0.0, 1.0 ],//18

    [ 0.0, 1.0, 1.0, 1.0 ], // cyan
    [ 0.0, 1.0, 1.0, 1.0 ],//20
    [ 0.0, 1.0, 1.0, 1.0 ],//21
    [ 0.0, 1.0, 1.0, 1.0 ],//22
    [ 0.0, 1.0, 1.0, 1.0 ],//23
    [ 0.0, 1.0, 1.0, 1.0 ],//24

    [ 0.0, 0.0, 1.0, 1.0 ], // blue
    [ 0.0, 0.0, 1.0, 1.0 ],//26
    [ 0.0, 0.0, 1.0, 1.0 ], 
    [ 0.0, 0.0, 1.0, 1.0 ],
    [ 0.0, 0.0, 1.0, 1.0 ],
    [ 0.0, 0.0, 1.0, 1.0 ],

    [ 1.0, 0.0, 1.0, 1.0 ], // magenta
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ],
    [ 1.0, 0.0, 1.0, 1.0 ]
]




var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    pcBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, pcBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pyramidColors), gl.STATIC_DRAW );

    ccBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, ccBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cubeColors), gl.STATIC_DRAW );
   

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.enableVertexAttribArray( vColor );

    pvBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, pvBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pyramidPositions), gl.STATIC_DRAW );

    cvBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cvBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cubePositions), gl.STATIC_DRAW );
   

    

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    //event listeners for buttons
    
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
        
    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);

    
    gl.bindBuffer( gl.ARRAY_BUFFER, pcBuffer );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, pvBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLES, 0, pyramidVertices );
    

    gl.bindBuffer( gl.ARRAY_BUFFER, ccBuffer );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.bindBuffer( gl.ARRAY_BUFFER, cvBuffer );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    
    gl.drawArrays( gl.TRIANGLES, 0, cubeVertices);

    requestAnimFrame( render );
}
