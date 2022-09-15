What I will definitely want to achieve: this should definitely be handed in with the next submission
- create more word searches based on topics e.g. sports, nationalities
- make my application more of a website rather than a single webpage (i.e. adding introduction pages, and utilising JavaScript’s dynamic features such as buttons, and an image carousel that shows all of the possible word searches the user can play)
- add feedback/help forms within the webpage and link them to my personal email.

var myIndex = 0;
        carousel();

        function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}
        x[myIndex-1].style.display = "block";
        setTimeout(carousel, 3000);
        }

links: 
https://www.youtube.com/watch?v=RlC1bawrcbk 
https://www.youtube.com/watch?v=9HcxHDS2w1s
https://stackoverflow.com/questions/21949198/styling-html-text-without-css
https://www.youtube.com/watch?v=rpujWVkmiPE 


// this file creates the grids for the game

(function() {

    // puts this file in strict mode, eliminating silent errors and 
    // throws them so the code does not run with errors
    "use strict";

    // this initialises the object

    var n = function() {

            // defines the possible letters that can go in grid
            var n = "abcdefghijklmnoprstuvwyz",

                // a list of possible word orientations
                r = ["horizontal", "horizontalBack", "vertical", "verticalUp", "diagonal", "diagonalUp", "diagonalBack", "diagonalUpBack"],
                
                // a definition of each orientation, which calculates
                // the next square of a word given its starting square
                // and its distance  
                // n = x position, r = y position, t = distance from letter
                t = {
                    horizontal: function(n, r, t) {
                        return {
                            x: n + t,
                            y: r
                        }
                    },
                    horizontalBack: function(n, r, t) {
                        return {
                            x: n - t,
                            y: r
                        }
                    },
                    vertical: function(n, r, t) {
                        return {
                            x: n,
                            y: r + t
                        }
                    },
                    verticalUp: function(n, r, t) {
                        return {
                            x: n,
                            y: r - t
                        }
                    },
                    diagonal: function(n, r, t) {
                        return {
                            x: n + t,
                            y: r + t
                        }
                    },
                    diagonalBack: function(n, r, t) {
                        return {
                            x: n - t,
                            y: r + t
                        }
                    },
                    diagonalUp: function(n, r, t) {
                        return {
                            x: n + t,
                            y: r - t
                        }
                    },
                    diagonalUpBack: function(n, r, t) {
                        return {
                            x: n - t,
                            y: r - t
                        }
                    }
                },

                // this function determines if one of the above 
                // orientations is possible given the starting 
                // position of the square, its height and width
                // and the words length. This function will return
                // true if the word will fit while starting 
                // at the provided startingf square  
                // n = x position, r = y position, t = height. o = length, e = word length
                o = {
                    horizontal: function(n, r, t, o, e) {
                        return o >= n + e
                    },
                    horizontalBack: function(n, r, t, o, e) {
                        return n + 1 >= e
                    },
                    vertical: function(n, r, t, o, e) {
                        return t >= r + e
                    },
                    verticalUp: function(n, r, t, o, e) {
                        return r + 1 >= e
                    },
                    diagonal: function(n, r, t, o, e) {
                        return o >= n + e && t >= r + e
                    },
                    diagonalBack: function(n, r, t, o, e) {
                        return n + 1 >= e && t >= r + e
                    },
                    diagonalUp: function(n, r, t, o, e) {
                        return o >= n + e && r + 1 >= e
                    },
                    diagonalUpBack: function(n, r, t, o, e) {
                        return n + 1 >= e && r + 1 >= e
                    }
                },

                // if the square position was invalid, this function
                // is called. It determines the next possible 
                // valid square for the word given that the square 
                // was invalid and had a letter length of 1. 
                // n = x pos, r = y pos, t = word length
                e = {
                    horizontal: function(n, r, t) {
                        return {
                            x: 0,
                            y: r + 1
                        }
                    },
                    horizontalBack: function(n, r, t) {
                        return {
                            x: t - 1,
                            y: r
                        }
                    },
                    vertical: function(n, r, t) {
                        return {
                            x: 0,
                            y: r + 100
                        }
                    },
                    verticalUp: function(n, r, t) {
                        return {
                            x: 0,
                            y: t - 1
                        }
                    },
                    diagonal: function(n, r, t) {
                        return {
                            x: 0,
                            y: r + 1
                        }
                    },
                    diagonalBack: function(n, r, t) {
                        return {
                            x: t - 1,
                            y: n >= t - 1 ? r + 1 : r
                        }
                    },
                    diagonalUp: function(n, r, t) {
                        return {
                            x: 0,
                            y: t - 1 > r ? t - 1 : r + 1
                        }
                    },
                    diagonalUpBack: function(n, r, t) {
                        return {
                            x: t - 1,
                            y: n >= t - 1 ? r + 1 : r
                        }
                    }
                },

                // this function initialises the grid and places the 
                // required words to be found one at a time. This will
                // return either a valid puzzle with all the required words
                // or null if a valid grid was not found. As our words
                // are mostly shorter, this function will rarely be called

                // two parameters: 

                // words(n) = the list of words to fit into the grid 
                // puzzle(r) = the options to use when filling the puzzle   
                i = function(n, r) {
                    // i = a list for the puzzle
                    // o and t are counters
                    // e = len, the length of a word
                    var t, o, e, i = [];

                    // adds blank spots to the grid to create an empty grid
                    // r = words, i = puzzle
                    for (t = 0; t < r.height; t++)
                        for (i.push([]), o = 0; o < r.width; o++) i[t].push("");
                    
                    // adds each word into the puzzle individually
                    // e = len, n = words
                    for (t = 0, e = n.length; e > t; t++)

                        // if a word does not fit in the puzzle, retry the 
                        // grid  
                        // a = placeWordInPuzzle function
                        // i = puzzle, 
                        // r = options
                        // n[t] = words[i]
                        if (!a(i, r, n[t])) return null;

                    // return the puzzle.
                    return i 
                },

                // adds each word to the puzzle by finding all possible
                // locations where the word will fit and then randomly choose
                // a spot to fit the word. r (options) will control whether
                // or not the word maximising the word overlap is good

                // this function will return true if the word is placed 

                // three parameters:
                // n = puzzle --> the current grid state
                // r = options --> the available options when filling the puzzle
                // o = word: the word that needs to be put into the puzzle  

                // n = puzzle, r = options, o = word
                a = function(n, r, o) {
                    // fiind all of the locations where the word may fit
                    // e = locations, 
                    // l = function findBestLocations
                    // n = puzzle, r = options, o = word
                    var e = l(n, r, o);

                    // if there is not a spot for the word, 
                    // return false
                    // e = locations
                    if (0 === e.length) return !1;

                    // select a location at random and place the word in that spot
                    // i = selectSpot
                    // e = locations
                    // c = function placeWord
                    // n = puzzle
                    // o = word
                    // t = orientations
                    var i = e[Math.floor(Math.random() * e.length)];
                    return c(n, o, i.x, i.y, t[i.orientation]), !0
                },

                // this function will iterate through the puzzle, determining if
                // all locations where the word will fit are available. 
                // here, options determine if the overlap shoild be utilised
                // or not. 

                // this function returns a list of locations which contain a 
                // x and y coordinate, which indicates the start of the word,
                // its orientation, and the number of letters that are overlapped
                // with its existing letter. 

                // 3 parameters:
                // puzzle (n): the current state of the grid
                // options (r): available options when filling the puzzle
                // word (i): the word that is required to be fit into the puzzle. 

                // l = function findBestLocations
                // n = puzzle, r = options, i = word
                l = function(n, r, i) {
                    // a = locations, l = height, c = width
                    // r = options, h = wordLength, i = word, g = maxOverlap, v = counter, p = word length
                    for (var a = [], l = r.height, c = r.width, h = i.length, g = 0, v = 0, p = r.orientations.length; p > v; v++)
                        
                        // d = orientation, r = options, s = check, x = next, y = skipTo, k = x, B = y, l = height
                        // o = function(checkOrientations), x = function orientations, y = function skipOrientations
                        for (var d = r.orientations[v], s = o[d], x = t[d], y = e[d], k = 0, B = 0; l > B;)
                            
                            // s = function checl
                            // k = x pos, B = y pos
                            // l = height, c = width, h = word length
                            if (s(k, B, l, c, h)) {

                                // w = overlap, u = calcOverlap, 
                                // i = word, n = puzzle, k = x, B = y, x = next
                                var w = u(i, n, k, B, x);

                                // w = overlap, g = maxOverlap, r = optoins, a = locations
                                (w >= g || !r.preferOverlap && w > -1) && (g = w, a.push({
                                    x: k,
                                    y: B,

                                    // d = orientatons, w= overlap
                                    orientation: d,
                                    overlap: w

                                    // B = y, k = x, c = width
                                })), k++, k >= c && (k = 0, B++)
                            } else {

                                // if the current cell found does not accomodate the word, 
                                // skip to the next position where the orientation is possibel  
                                
                                // U = nextPossible location, y = skipTo
                                // k = x, B = y
                                var U = y(k, B, h);
                                k = U.x, B = U.y

                                // reduce all the posible locations by only using the ones
                                // with the highest overlap calculated
                                // r = options, a = locations, g = maxOverlap
                            } return r.preferOverlap ? f(a, g) : a
                },

                // this function determines whether or not a word 
                // fits in an orientation within the grid  

                // this returns the number of letters overlapped with 
                // existing words if the word fits in the required position
                // returns -1 if the word does not fit in the spot

                // 5 parameters:
                // word (n): word to fit in the grid
                // puzzle (r): the current puzzle
                // x (t): the x positon/row to check
                // y (o): the y position/col to check
                // fnGetSquare (e): the function that will return the 
                // next position square

                // u = functoin calcOverlap
                // n = word, r = puzzle, t = x, o = y, e = fnGetSquare
                u = function(n, r, t, o, e) {
                    // loop through the squares to determine if each letter in the 
                    // word fits. 

                    // i = overlap, l = len, n = word
                    for (var i = 0, a = 0, l = n.length; l > a; a++) {
                        // e = fnGetSquare
                        // t = x, o = y, a = i
                        // f = square, r = puzzle
                        var u = e(t, o, a),
                            f = r[u.y][u.x];

                        // if the puzzle already contains the letter we are trying
                        // to look for, then this word is overlapping with another word
                        // therefore, count it as an overlap square
                        // f = square, n = word, a = i, i = overlap
                        if (f === n[a]) i++;

                        // if it contains a separate letter, then our word does not fit
                        // f = square
                        else if ("" !== f) return -1
                    }

                    // if the whole word overlaps another word, skip it to ensure
                    // that the word is not hidden in the larger word. 
                    return i
                },

                // if there was a maximisation in the overlap above, this function
                // is called to reduce the list of valid locations for a word
                // down to the ones that contain the maximum overlap that
                // was previously found. 

                // returns the reduced location sample 

                // 2 parameters:
                // locations (n): the set of locations to prune
                // overlap (r): the required overlap

                f = function(n, r) {
                    // t = pruned, e = len, n = locations, r = overlap, 
                    // n = locations
                    for (var t = [], o = 0, e = n.length; e > o; o++) n[o].overlap >= r && t.push(n[o]);
                    return t
                },

                // this function places a word on the grid given its
                // starting position and orientation

                // 5 parameters:

                // puzzle (n): the current puzzle
                // word (r): the current word to fit in the puzzle
                // x (t): the x positon of the letter to check
                // y (o): the y position of the letter to check
                // fnGetSquare (e): function returning the next square to place
                // letter in  

                // c = placeword, 
                c = function(n, r, t, o, e) {
                    // a = len, r = word, l = next, e = fnGetSquare
                    // t = x, o = y
                    for (var i = 0, a = r.length; a > i; i++) {
                        var l = e(t, o, i);
                        // l = next, r = word
                        n[l.y][l.x] = r[i]
                    }
                };


            return {
                // returns a list of all possible orientations for a word
                // r = validorientations
                validOrientations: r,

                // returns the orientation possiblities for looping words
                // t = orientations
                orientations: t,

                // this funciton generates a new word search grid

                // two parameters:

                // words (n): list of words to pass into the puzzle
                // options (t): the options to use in this puzzle  

                newPuzzle: function(n, t) {
                    // o = word list, e = puzzle, a = atempts
                    var o, e, a = 0,
                    // l = opts, t = settings
                        l = t || {};

                    // sort each word by length and insert into the puzzle from 
                    // longest to shortest. 
                    o = n.slice(0).sort(function(n, r) {
                        return n.length < r.length ? 1 : 0
                    });

                    // u = options
                    // l = opts
                    // e = puzzle
                    for (var u = {

                            // height: desired height of the puzzle, which is defaulted
                            // to the smallest possible value. 
                            height: l.height || o[0].length,

                            // width: desired width of the puzzle, defaulted to the 
                            // smalelst possible value  
                            width: l.width || o[0].length,

                            // this is the list of orientations to use, defaulted at all 
                            // orientations
                            orientations: l.orientations || r,

                            // defaults at true, required to fill in blank spaces
                            fillBlanks: void 0 !== l.fillBlanks ? l.fillBlanks : !0,

                            // number of tries to accompany each word. Defaulted at 
                            // three tries total
                            maxAttempts: l.maxAttempts || 3,

                            // determines if the word overlapping should be maximised. 
                            // this is defaulted as true  
                            preferOverlap: void 0 !== l.preferOverlap ? l.preferOverlap : !0
                        }; !e;) {
                        // adds words to the puzzle
                        // u = options, 
                        // e = puzzle, i = function fillpuzzle
                        // o = word list
                        for (; !e && a++ < u.maxAttempts;) e = i(o, u);
                        e || (u.height++, u.width++, a = 0)
                    }
                    return u.fillBlanks && this.fillBlanks(e, u), e
                },

                // fills in the empty spaces inside the grid with random letters

                // puzzle (r): the current puzzle
                fillBlanks: function(r) {
                    // for each row, column in the grid, if the grid is empty, 
                    // add a random letter to it. 
                    // o = height, r = puzzle
                    for (var t = 0, o = r.length; o > t; t++)
                        // e = row, a = width, e = row
                        for (var e = r[t], i = 0, a = e.length; a > i; i++)
                            if (!r[t][i]) {
                                var l = Math.floor(Math.random() * n.length);
                                r[t][i] = n[l]
                            }
                },

                // this function returns the starting location and orientation of the specified 
                // words within the puzzle/ 

                // this wll return:

                // x position of the start of each word
                // y position of the start of each word
                // the orientation of each word
                // the word itself
                // overlap (which will be the same value as the word length)

                // n = puzzle, t = words
                solve: function(n, t) {

                    // o = options
                    for (var o = {
                            // n = puzzle, r = all orientations
                            height: n.length,
                            width: n[0].length,
                            orientations: r,
                            preferOverlap: !0

                            // e = found, i = notfound
                        }, e = [], i = [], a = 0, u = t.length; u > a; a++) {

                        // f = word, t = words
                        var f = t[a],

                        // c = locations, l = findBestLocations, 
                        // n = puzzle, o = options, f = word
                        // e = found, i = notfound
                            c = l(n, o, f);
                        c.length > 0 && c[0].overlap === f.length ? (c[0].word = f, e.push(c[0])) : i.push(f)
                    }
                    return {
                        found: e,
                        notFound: i
                    }
                },

                // outputs a puzzle to the screen

                // puzzle (n): the current puzzle. 
                print: function(n) {
                    // r = puzzle string
                    // n = puzzle, 
                    // o = height, 
                    // e = row
                    for (var r = "", t = 0, o = n.length; o > t; t++) {
                        for (var e = n[t], i = 0, a = e.length; a > i; i++) r += ("" === e[i] ? " " : e[i]) + " ";
                        r += "\n"
                    }
                    return r
                }
            }
        },

        // allows jquery library to be used in both the browser
        root = "undefined" != typeof exports && null !== exports ? exports : window;
    root.wordfind = n()
}).call(this);