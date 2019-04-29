var canvas;
var gl;

var NumVertices = 3;
var vertexPositions = [
    vec4(-0.5, 0.5, 0.5, 1),
    vec4(-0.5, -0.5, 0.5, 1),
    vec4(0.5, -0.5, 0.5, 1)
];

var vertexColors = [
    [0.0, 0.0, 0.0, 1.0],
    [0.0, 0.0, 0.0, 1.0],
    [0.0, 0.0, 0.0, 1.0]
];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
var theta = [0,0,0];
var thetaLoc;


window.onload = function init()
{
    canvas=document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl'); //you could've said 2d, if you wanted
    gl.viewport(0,0, canvas.width, canvas.height);
    /*
    PARAM 1: x coordinate of lower left corner of viewpoint
    PARAM 2: y coordinate of lower left corner of viewpoint
    PARAM 3: width of viewpoint
    PARAM 4: height of viewpoint
    */

    gl.clearColor(1.0, 0.0, 0.0, 1.0);
   
    var vertexShader;
    var fragmentShader;

    /* ****** VERTEX SHADER ****** */
    var vertexElement = document.getElementById("vertex-shader");
    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexElement.text);
    gl.compileShader(vertexShader);

    /* ****** FRAGMENT SHADER ****** */
    var fragmentElement = document.getElementById("fragment-shader");
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentElement.text);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
   // gl.clear(gl.COLOR_BUFFER_BIT);

   /* ****** VERTEX BUFFER OBJECT (VBO) ****** */
   var cBuffer = gl.createBuffer(); //for color
   gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW); //all data in a buffer

   var vColor = gl.getAttribLocation(program, 'vColor');
   gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(vColor);




   var vBuffer = gl.createBuffer(); //for color
   gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexPositions), gl.STATIC_DRAW); //all data in a buffer

   var vPosition = gl.getAttribLocation(program, 'vPosition');
   gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

   gl.enableVertexAttribArray(vPosition);

   thetaLoc=gl.getUniformLocation(program, "theta");

   document.getElementById("xButton").onclick = function(){
       axis=xAxis;
   }

   document.getElementById("yButton").onclick = function(){
       axis=yAxis;
   }

   document.getElementById("zButton").onclick = function(){
       axis=zAxis;
   }

   render();

}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    theta[axis] +=2;
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLES, 0, NumVertices);

    requestAnimFrame(render);
}