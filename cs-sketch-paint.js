// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-09-20 22:55:31 Chuck Siska>

// ============================================================ Mods ====
// 2020-02-10 16:42:24: Add btns.
// 2020-02-09 16:55:21: Add btn onclick exported fn
// 2020-02-10 17:22:23: Log btn onclick
// 2020-03-11 13:15:36: Add list_fn (& maybe more)
// 2020-09-12 14:23:07: Add g_img_stuff usage
// 2020-09-12 16:14:03: Paint maze using file images: add g_img_stuff;
//  rip g_box; repl g_canvas w g_grid; repl g_cnv w g_p5_cnv
//  Add New Maze Drawing Code Section.

// Make global g_grid JS 'object': a key-value 'dictionary'.
var g_grid; // JS Global var, w grid size info; cvts grid cells to pixels
var g_frame_cnt; // Setup a P5 display-frame counter, to do anim
var g_frame_mod; // Update ever 'mod' frames.
var g_stop; // Go by default.
var g_p5_cnv;   // To hold a P5 canvas.
var g_button; // btn
var g_button2; // btn
var g_color;
var g_sctrl;
var g_tiles;

var g_l4job = { id:1 }; // Put Lisp stuff f JS-to-access in ob; id to force ob.


function change_frame_rate(el) {
    el.previousSibling.previousSibling.textContent = el.value;
    g_frame_mod = el.value; // event.target.value;
}
function startbutton(){
  g_stop = ! g_stop;
}
function do_btn( )
{ // grab code from csu\assets\js\js+p5+editbox

    // Creates an <input></input> element in the DOM for text input.
    // Use g_input.size() to set the display length of the box.
    // g_input = createInput( ); // Create input textbox.
    // g_input.position(  20, 30 );
    // g_button = createButton( "Submit" );
    // g_button.id( "btn" ); //Add for P5 btn onclick
    // g_button.position( 160, 30 );
    //text( "Enter your name.", 20, 20 );

    g_button2 = createButton( "Save Image" );
    g_button2.position( 20, 60 );
    g_button2.mousePressed( save_image ); // the callback
}

function save_image( ) // btn
{
    save('myCanvas-' + g_frame_cnt +  '.jpg');
}

  //Also g_img_cell = loadImage( '10x10-sqr-RBY.png' );
let g_img_stuff;

function get_images( )
{
    g_img_stuff = new Image( );
    g_img_stuff.src = "sprite-cells-28x28-a.png";
}

function setup( ) // P5 Setup Fcn
{
    console.log( "p5 Beg P5 setup =====");
    console.log( "p5 @: log says hello from P5 setup()." );
    g_grid = { cell_size:28, wid:36, hgt:28 };
    g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
    g_frame_mod = 60; // Update ever 'mod' frames.
    g_stop = 1; // Go by default.
    g_sctrl = 0;
    g_l4job = { id:1 };

    let sz = g_grid.cell_size;
    let width = sz * g_grid.wid;
    let height = sz * g_grid.hgt;
    g_p5_cnv = createCanvas( width, height );  // Make a P5 canvas.
    console.log( "p5 @: createCanvas()." );
    draw_grid( sz, 50, 'white', 'yellow' );
    do_btn( ); //
    console.log( "p5 Load the image." );
    get_images( );
    console.log( "p5 End P5 setup =====" );
}

var g_bot = {
    dir: 0,
    x:1, y:0,
    color:100,
    at({x, y}) { return this.x === x && this.y === y }
}; // Dir is 0..3 with 0 south, 1 east, 2 north, 3 west

var g_goal = {
    x: 35, y: 26
};


// ==================================================
// =================== New Maze Drawing Code ========
// ==================================================
function get_sprite_by_id( rsprite_id ) // get sprite sheet x,y offsets obj.
{ // ID is a 0-based index; sprites are assumed to be grid cell size.
    // Sprite sheet is 2-elts 1-row, wall=0 and floor=1.
    let id = rsprite_id % 6;
    let sprite_ob = { id: id, img: g_img_stuff };
    sprite_ob.sheet_pix_x = id * g_grid.cell_size;
    sprite_ob.sheet_pix_y = 0;
    return sprite_ob;
}

function grid_to_pix( rx, ry ) // Cvt grid cell x,y to canvas x,y wrapped.
{
    let pix_ob = { x: (rx % g_grid.wid) * g_grid.cell_size,
                   y: (ry % g_grid.hgt) * g_grid.cell_size };
    return pix_ob;
}

function draw_sprite_in_cell( rsprite_id, rx, ry ) // wraps in x,y ifn.
{
    console.log( "(p5 draw_sprite_in_cell ", rsprite_id, rx, ry, " )" );
    let sprite_ob = get_sprite_by_id( rsprite_id );
    let pix_ob = grid_to_pix( rx, ry );
    let ctx = g_p5_cnv.canvas.getContext( '2d' ); // get html toolbox to draw.
    ctx.drawImage( sprite_ob.img,
                   sprite_ob.sheet_pix_x, sprite_ob.sheet_pix_y,
                     g_grid.cell_size, g_grid.cell_size,
                   pix_ob.x, pix_ob.y,
                     g_grid.cell_size, g_grid.cell_size );
    console.log( "end draw_sprite_in_cell)" );
}
// ==================================================
// =================== END New Maze Drawing Code ========
// ==================================================

function draw_update()  // Update our display.
{
    //console.log( "p5 Call g_l4job.draw_fn" );
    g_l4job.draw_fn( );
}

function csjs_get_pixel_color_sum( rx, ry )
{
    let acolors = get( rx, ry ); // Get pixel color [RGBA] array.
    let sum = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ]; // Sum RGB.
    //dbg console.log( "color_sum = " + sum );
    return sum;
}

function move_bot_to_mouse( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "p5 move_bot: x,y = " + x + "," + y );
    let cz = g_grid.cell_size;
    let gridx = floor( x / cz );
    let gridy = floor( y / cz );
    //console.log( "p5 move_bot: gridx,y,cz = " + gridx + "," + gridy + ", " +cz );
    g_bot.x = gridx + g_grid.wid; // Ensure it's positive.
    g_bot.x %= g_grid.wid; // Wrap to fit box.
    g_bot.y = gridy + g_grid.hgt;
    g_bot.y %= g_grid.hgt;
}


function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (!g_stop && (0 === g_frame_cnt % g_frame_mod))
    {
        if (!g_bot.at(g_goal)) {
            g_bot.move();
        }
    }
}

function keyPressed( )
{
    // if ('a' == key) g_sctrl = 0;
    // if ('b' == key) g_sctrl = 1;
    if ('s' === key) g_stop = ! g_stop;
    if ('p' === key) {
        console.log( "p5 list_fn" );
        g_l4job.list_fn( );
    }
    // if ('z' == key) {
    //     console.log( "p5 Call g_l4job.zzdefg_fn" );
    //     g_l4job.zzdefg_fn( );
    // }

    console.log( `p5 keyPressed: ${key} ${keyCode}`);

    console.log( "p5 keyPressed: post g_stop = " + g_stop );
    // console.log( "p5 mouseIsPressed = " + mouseIsPressed );

    if (g_stop)
    {
        noLoop();
    }
    else
    {
        loop();
    }
}
