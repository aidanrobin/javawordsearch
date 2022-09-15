// this file is what allows the user to play the game 

 ! function(e, t, n) {

     // puts this file in strict mode, eliminating silent errors and 
     // throws them so the code does not run with errors
     "use strict";
     var r = function() {
         var r, o, a, l = function(e, n) {
                 // for each puzzle row
                 for (var r = "", o = 0, a = n.length; a > o; o++) {
                     // appends a div to represent puzzle row
                     var l = n[o];

                     r += "<div>";

                     // for each element in a row, loop appends a button for clicking each letter
                     for (var u = 0, s = l.length; s > u; u++) r += '<button class="gridSquare" x="' + u + '" y="' + o + '">', 
                     r += l[u] || "&nbsp;", r += "</button>";

                     // close the div element
                     r += "</div>"
                 }
                 t(e).html(r)
             },

             u = function(e, n) {
                 for (var r = "<ul>", o = 0, a = n.length; a > o; o++) {
                     var l = n[o];
                     r += '<li class="word ' + l + '">' + l
                 }
                 r += "</ul>", t(e).html(r)
             },

             // defines the game state 
             // s = a empty list for the start squares and selected squares
             s = [],

             // i involves empty strings for the current orientation and word
             i = "",

             // this event handles what happens when the mouse is clicked
             // on a new square. sets the variables to the current letter clicked
             d = function() {
                 t(this).addClass("selected"), o = this, s.push(this), i = t(this).text()
             },


             c = function(e) {
                 if (o) {

                     var n = s[s.length - 1];
                     if (n != e) {

                         for (var r, l = 0, u = s.length; u > l; l++)
                             if (s[l] == e) {
                                 r = l + 1;
                                 break

                             } for (; r < s.length;) t(s[s.length - 1]).removeClass("selected"), s.splice(r, 1), i = i.substr(0, i.length - 1);

                         // determines if this has calculated an orientation from the first square
                         // makes selecting diagonal words easier
                         var d = p(t(o).attr("x") - 0, t(o).attr("y") - 0, t(e).attr("x") - 0, t(e).attr("y") - 0);
                         d && (s = [o], i = t(o).text(), n !== o && (t(n).removeClass("selected"), n = o), a = d);

                         // determines if the user click is on the same orientation as the previous move. 
                         var c = p(t(n).attr("x") - 0, t(n).attr("y") - 0, t(e).attr("x") - 0, t(e).attr("y") - 0);

                         // if there was no previous orientation for the word
                         // or this click process is the same as the last process
                         // then let the process proceed. 
                         c && (a && a !== c || (a = c, h(e)))
                     }
                 }
             },

             // this function defines how many touches the user has to make
             // to find the correct word
             f = function(t) {
                 var n = t.originalEvent.touches[0].pageX,
                     r = t.originalEvent.touches[0].pageY,
                     // dreturns the top most element at the coordinates (n, r)
                     o = e.elementFromPoint(n, r);
                 c(o)
             },

             // this function basiaclly allows the user to select words 
             // to guess for the game. When the mouse is moved, each 
             // letter is selected. 
             v = function() {
                 c(this)
             },

             // this handles 
             h = function(e) {
                 for (var n = 0, o = r.length; o > n; n++)
                     if (0 === r[n].indexOf(i + t(e).text())) {
                         t(e).addClass("selected"), s.push(e), i += t(e).text();
                         break
                     }
             },

             // this determines to see if a valid word was created. If so, 
             // updates the word bank to show the word was found, then resets the 
             // game board so the user can choose again. 
             z = function() {
                 for (var e = 0, n = r.length; n > e; e++) r[e] === i && (t(".selected").addClass("found"), r.splice(e, 1), t("." + i).addClass("wordFound")), 
                 0 === r.length && t(".gridSquare").addClass("complete");

                 // resets the game board to normal
                 t(".selected").removeClass("selected"), o = null, s = [], i = "", a = null
             },

             // this function: given two points, ensures that that the 
             // points are adjacent to each other, where the second 
             // point is realtive to the first. 

             // paramaters (4):

             // e(x1): the x coordinate (first point)
             // t(y1): the y coordinate (first point)
             // r(x2): the x coordinate (second point)
             // o(y2): the y coordinate (second point)

             p = function(e, t, r, o) {
                 for (var a in n.orientations) {
                     var l = n.orientations[a],
                         u = l(e, t, 1);
                     if (u.x === r && u.y === o) return a
                 }
                 return null
             };


         return {
             create: function(e, o, a, s) {
                 r = e.slice(0).sort();
                 var i = n.newPuzzle(e, s);
                 return l(o, i), u(a, r), window.navigator.msPointerEnabled ? (t(".gridSquare").on("MSPointerDown", d), t(".gridSquare").on("MSPointerOver", c), 
                 t(".gridSquare").on("MSPointerUp", z)) : (t(".gridSquare").mousedown(d), t(".gridSquare").mouseenter(v), t(".gridSquare").mouseup(z), 
                 t(".gridSquare").on("touchstart", d), t(".gridSquare").on("touchmove", f), t(".gridSquare").on("touchend", z)), i
             },

             // solves a puzzle if the user chooses to give up. 
             // it gives each answer in the grid and outputs it to the user

             solve: function() {
                 for (var o = n.solve(e, r).found, a = 0, l = o.length; l > a; a++) {
                     var u = o[a].word,
                         s = o[a].orientation,
                         i = o[a].x,
                         d = o[a].y,
                         c = n.orientations[s];
                     if (!t("." + u).hasClass("wordFound")) {
                         for (var f = 0, v = u.length; v > f; f++) {
                             var h = c(i, d, f);
                             t('[x="' + h.x + '"][y="' + h.y + '"]').addClass("solved")
                         }
                         t("." + u).addClass("wordFound")
                     }
                 }
             }
         }
     };

     // allows the game to be used in a browser. 
     window.wordfindgame = r()
 }(document, jQuery, wordfind);
