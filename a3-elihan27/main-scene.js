import {tiny, defs} from './assignment-3-resources.js';
                                                                // Pull these names into this module's scope for convenience:
const { Vec, Mat, Mat4, Color, Shape, Shader,
         Scene, Canvas_Widget, Code_Widget, Text_Widget } = tiny;
const { Cube, Subdivision_Sphere, Transforms_Sandbox_Base } = defs;

    // Now we have loaded everything in the files tiny-graphics.js, tiny-graphics-widgets.js, and assignment-3-resources.js.
    // This yielded "tiny", an object wrapping the stuff in the first two files, and "defs" for wrapping all the rest.

// (Can define Main_Scene's class here)

const Main_Scene = defs.Transforms_Sandbox =
class Transforms_Sandbox extends Transforms_Sandbox_Base
{                                                    // **Transforms_Sandbox** is a Scene object that can be added to any display canvas.
                                                     // This particular scene is broken up into two pieces for easier understanding.
                                                     // See the other piece, Transforms_Sandbox_Base, if you need to see the setup code.
                                                     // The piece here exposes only the display() method, which actually places and draws 
                                                     // the shapes.  We isolate that code so it can be experimented with on its own.
                                                     // This gives you a very small code sandbox for editing a simple scene, and for
                                                     // experimenting with matrix transformations.
  display( context, program_state )
    {                                                // display():  Called once per frame of animation.  For each shape that you want to
                                                     // appear onscreen, place a .draw() call for it inside.  Each time, pass in a
                                                     // different matrix value to control where the shape appears.

                                                     // Variables that are in scope for you to use:
                                                     // this.shapes.box:   A vertex array object defining a 2x2x2 cube.
                                                     // this.shapes.ball:  A vertex array object defining a 2x2x2 spherical surface.
                                                     // this.materials.metal:    Selects a shader and draws with a shiny surface.
                                                     // this.materials.plastic:  Selects a shader and draws a more matte surface.
                                                     // this.lights:  A pre-made collection of Light objects.
                                                     // this.hover:  A boolean variable that changes when the user presses a button.
                                                     // program_state:  Information the shader needs for drawing.  Pass to draw().
                                                     // context:  Wraps the WebGL rendering context shown onscreen.  Pass to draw().                                                       

                                                // Call the setup code that we left inside the base class:
      super.display( context, program_state );

      /**********************************
      Start coding down here!!!!
      **********************************/         
                                                  // From here on down it's just some example shapes drawn for you -- freely 
                                                  // replace them with your own!  Notice the usage of the Mat4 functions 
                                                  // translation(), scale(), and rotation() to generate matrices, and the 
                                                  // function times(), which generates products of matrices.

      const blue = Color.of( 0,0,1,1 ), yellow = Color.of( 1,1,0,1 ), orange = Color.of( 1,0.5,0,1 ), trans = Color.of( 0,0,1,.5 ); //yellow = Color.of( 1,1,0,1 )

                                    // Variable model_transform will be a local matrix value that helps us position shapes.
                                    // It starts over as the identity every single frame - coordinate axes at the origin.
      let model_transform = Mat4.identity();
                                                     // Draw a hierarchy of objects that appear connected together.  The first shape
                                                     // will be the "parent" or "root" of the hierarchy.  The matrices of the 
                                                     // "child" shapes will use transformations that are calculated as relative
                                                     // values, based on the parent shape's matrix.  Moving the root node should
                                                     // therefore move the whole hierarchy.  To perform this, we'll need a temporary
                                                     // matrix variable that we incrementally adjust (by multiplying in new matrix
                                                     // terms, in between drawing shapes).  We'll draw the parent shape first and
                                                     // then incrementally adjust the matrix it used to draw child shapes.

                                                     // Position the root shape.  For this example, we'll use a box 
                                                     // shape, and place it at the coordinate origin 0,0,0:
       const t = this.t = program_state.animation_time/1000;

                                                      // Spin our current coordinate frame as a function of time.  Only do
                                                      // this movement if the button on the page has not been toggled off.
     //model_transform=model_transform.times( Mat4.translation(  0,0,1 )  );
      if (!this.hover){
          //model_transform=model_transform.times( Mat4.translation(  0,0,1 )  );
          model_transform=model_transform.times( Mat4.rotation( -t , Vec.of( 0,1,0 ) ) );
        // model_transform=model_transform.times( Mat4.translation(  1,0,0 )  );
          model_transform=model_transform.times( Mat4.translation( Vec.of(0, 5*Math.sin(5*t),0))  );
          //model_transform=model_transform.times(Mat4.translation(-2,0,0));

      }
      
      

                                                                                              // Draw the top box (head):
      this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( yellow ) ); 

      let eye_1=model_transform.copy();
      let eye_2=model_transform.copy();


      eye_1=eye_1.times( Mat4.translation([ -3, 0, 0 ])).times( Mat4.scale ([ 2,   2, 2 ]) );
      this.shapes.ball.draw( context, program_state, eye_1, this.materials.metal.override( blue ) );

     
      eye_2=model_transform.times( Mat4.translation([ 3, 0, 0 ])).times( Mat4.scale ([ 2,   2, 2 ]) );
       this.shapes.ball.draw( context, program_state, eye_2, this.materials.metal.override( blue ) );

      
      
                                                     //scale by 2, move over by 3 units (1.5).
     /* model_transform = model_transform.times( Mat4.scale      ([ 2,   2, 2 ]) ).times( Mat4.translation([ -1.5, 0, 0 ])); 
                                                                           // Draw left eye, a child of the hierarchy root.
      this.shapes.ball.draw( context, program_state, model_transform, this.materials.metal.override( blue ) );  //one eye

      //undo the move over, and then... move over again
      model_transform = model_transform.times( Mat4.translation([ 1.5, 0, 0 ]) ) .times(Mat4.translation([ 1.5, 0, 0 ]));
      this.shapes.ball.draw( context, program_state, model_transform, this.materials.metal.override( blue ) );

      //move over, and then scale down
      model_transform = model_transform.times( Mat4.translation([ -1.5, 0, 0 ]) ).times( Mat4.scale  ([ .5,   .5, .5 ]) ); //return to original model transforms
     

                                                                      
                                                                      // Prepare to draw another box object 2 levels deep 
                                                                      // within our hierarchy.
                                                                      // Find how much time has passed in seconds; we can use
                                                                      // time as an input when calculating new transforms:
     */
    


      model_transform   = model_transform.times( Mat4.translation([ 0,0, -2 ]) );
      this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( orange ) );
      
     
//-------------------------- PROTOTYPING START -------------------------- //

      //model_transform   = model_transform.times( Mat4.translation([ 0,0, -2 ]) ); 
        //if you want to stay still
      
       /*model_transform   = model_transform.times( Mat4.translation([ 0,-1, -1 ]) );
       model_transform = model_transform.times( Mat4.rotation( 0.1*Math.sin(2*Math.PI*t) + 0.03*Math.PI, Vec.of( -1,0,0 ) ) );
       model_transform   = model_transform.times( Mat4.translation([ 0,1, -1 ]) );*/
        //if you want to test on something moving
       
      //this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( orange ) );

      /*model_transform = model_transform.times( Mat4.translation([ -1,1, 0 ]) );
       model_transform = model_transform.times( Mat4.rotation( 0.5*Math.sin(2*Math.PI*t), Vec.of( 0,0,1 ) ) )
       .times( Mat4.translation([ -10,0.1, 0 ]) )
       .times( Mat4.scale  ([ 10,   0.1, 1 ]) );
       this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( trans ) );*/
       //wings testing

       /*model_transform = model_transform.times( Mat4.translation([ -1,-1, 0 ]) );
       model_transform = model_transform.times( Mat4.rotation( -.1*Math.sin(2*Math.PI*t)-.1, Vec.of( 0,0,1 ) ) )
       .times( Mat4.translation([ -0.3,-2, 0 ]) )
       .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
       this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( yellow ) );
       //first leg segment
       

        model_transform = model_transform
      .times (Mat4.scale  ([ 1/0.3,   0.5,  1/0.3]))
      .times( Mat4.translation([ 0.3,-2, 0 ]) );
       model_transform = model_transform.times( Mat4.rotation( .1*Math.sin(2*Math.PI*t)+.1, Vec.of( 0,0,1 ) ) )
       .times( Mat4.translation([ -0.3,-2, 0 ]) )
      // .times( Mat4.translation([ -0.3,-2, 0 ]) )
       .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
       this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( blue ) );*/
      //second leg segment



      /* model_transform = model_transform.times( Mat4.translation([ 1,-1, 0 ]) );
       model_transform = model_transform.times( Mat4.rotation( -0.5*Math.sin(2*Math.PI*t), Vec.of( 0,0,1 ) ) )
       .times( Mat4.translation([ -0.3,-2, 0 ]) )
       .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
       this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( yellow ) );*/





        /*model_transform= //model_transform.times (Mat4.scale  ([ 1/0.3,   0.5,  1/0.3]));

      model_transform
       .times (Mat4.scale  ([ 1/0.3,   0.5,  1/0.3]))
       .times( Mat4.translation([ 0.3, -2, 0 ]) )
       .times( Mat4.rotation( 0.5*Math.sin(2*Math.PI*t), Vec.of( 0,0,1 ) ) )*/
       //.times( Mat4.translation([ -1, 1, 0]) )


      // .times( Mat4.translation([ 0, -2, -0.3 ]) )
       //.times( Mat4.scale  ([ 0.3,   2,  0.3]) );

       
       //this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( blue ) );

//-------------------------- PROTOTYPING END -------------------------- //

       
    for ( let i=0; i<9; i++){

       model_transform   = model_transform.times( Mat4.translation([ 0,-1, -1 ]) );
       model_transform = model_transform.times( Mat4.rotation( 0.1*Math.sin(2*Math.PI*t) + 0.03*Math.PI, Vec.of( -1,0,0 ) ) );
       //model_transform = model_transform.times( Mat4.rotation( 0.1*Math.sin(2*Math.PI*t) + 0.03*Math.PI, Vec.of( -1,0,0 ) ) );
       model_transform   = model_transform.times( Mat4.translation([ 0,1, -1 ]) );
       this.shapes.box.draw( context, program_state, model_transform, this.materials.plastic.override( orange ) );

       if (i==0 || i==1){
           let wing_1 =  model_transform.copy();
           wing_1 = wing_1.times( Mat4.translation([ 1,1, 0 ]) );
           wing_1 = wing_1.times( Mat4.rotation( 0.5*Math.sin(2*Math.PI*t), Vec.of( 0,0,1 ) ) )
       .times( Mat4.translation([ 10,0.1, 0 ]) ).times( Mat4.scale  ([ 10,   0.1, 1 ]) );
       this.shapes.box.draw( context, program_state, wing_1, this.materials.plastic.override( trans ) );
      
        let wing_2 =  model_transform.copy();
           wing_2 = wing_2.times( Mat4.translation([ -1,1, 0 ]) );
           wing_2 = wing_2.times( Mat4.rotation( -0.5*Math.sin(2*Math.PI*t), Vec.of( 0,0,1 ) ) )
       .times( Mat4.translation([ -10,0.1, 0 ]) ).times( Mat4.scale  ([ 10,   0.1, 1 ]) );
       this.shapes.box.draw( context, program_state, wing_2, this.materials.plastic.override( trans ) );
   
       }

       if (i==0 || i==1 || i==2){
           let leg_1 = model_transform.copy();
           leg_1 = leg_1.times( Mat4.translation([ -1,-1, 0 ]) );
           leg_1 = leg_1.times( Mat4.rotation( -.1*Math.sin(2*Math.PI*t)-.1 , Vec.of( 0,0,1 ) ) )
           //leg_1 = leg_1.times( Mat4.rotation( .3*Math.sin(2*Math.PI*t) , Vec.of( 0,0,1 ) ) )
           .times( Mat4.translation([ -0.3,-2, 0 ]) )
           .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
           this.shapes.box.draw( context, program_state, leg_1, this.materials.plastic.override( yellow ) )

            leg_1 = leg_1
            .times (Mat4.scale  ([ 1/0.3,   0.5,  1/0.3]))
            .times( Mat4.translation([ 0.3,-2, 0 ]) );
            leg_1 = leg_1.times( Mat4.rotation( .1*Math.sin(2*Math.PI*t)+.1, Vec.of( 0,0,1 ) ) )
            .times( Mat4.translation([ -0.3,-2, 0 ]) )
            .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
            this.shapes.box.draw( context, program_state, leg_1, this.materials.plastic.override( yellow ) )




           let leg_2 = model_transform.copy();
           leg_2 = leg_2.times( Mat4.translation([ 1,-1, 0 ]) );
           leg_2 = leg_2.times( Mat4.rotation( 0.1*Math.sin(2*Math.PI*t) +.1, Vec.of( 0,0,1 ) ) )
           .times( Mat4.translation([ 0.3,-2, 0 ]) )
           .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
           this.shapes.box.draw( context, program_state, leg_2, this.materials.plastic.override( yellow ) )

           leg_2 = leg_2
           .times (Mat4.scale  ([ 1/0.3,   0.5,  1/0.3]))
           .times( Mat4.translation([ -0.3,-2, 0 ]) );
           leg_2 = leg_2.times( Mat4.rotation( -.1*Math.sin(2*Math.PI*t)-.1, Vec.of( 0,0,1 ) ) )
           .times( Mat4.translation([ 0.3,-2, 0 ]) )
           .times( Mat4.scale  ([ 0.3,   2,  0.3]) );
           this.shapes.box.draw( context, program_state, leg_2, this.materials.plastic.override( yellow ) )
       
       }
       

          
      }



                              // Note that our coordinate system stored in model_transform still has non-uniform scaling
                              // due to our scale() call.  This could have undesired effects for subsequent transforms;
                              // rotations will behave like shears.  To avoid this it may have been better to do the
                              // scale() last and then immediately unscale after the draw.  Or better yet, don't store
                              // the scaled matrix back in model_transform at all -- but instead in just a temporary
                              // expression that we pass into draw(), or store under a different name.
    }
}

const Additional_Scenes = [];

export { Main_Scene, Additional_Scenes, Canvas_Widget, Code_Widget, Text_Widget, defs }