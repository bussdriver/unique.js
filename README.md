# unique.js
Javascript array utility function to create an array of unique items

tests
var o={first:1};
var aa=[4,4]
a=[1,1,o,1,2,{second:2},1,3,3,o,4,aa,2,o,5,aa,4,o,6];

IS( JSON.stringify( Array.unique(a) )
,"[1,{\"first\":1},2,{\"second\":2},3,4,[4,4],5,6]"
,'unique with mixed stuff - likely ECMA 6 mode');


IS( JSON.stringify( Array._unique(a) )
,"[1,{\"first\":1},2,{\"second\":2},3,4,[4,4],5,6]"
,'unique with mixed stuff - ECMA 5 mode');

IS( JSON.stringify( Array.unique(a,function(x){return x;}) )
,"[1,{\"first\":1},2,{\"second\":2},3,4,[4,4],5,6]" 
,'unique with mixed stuff - likely ECMA 6 mode');

IS( JSON.stringify( Array._unique(a,function(x){return x;}) )
,"[1,{\"first\":1},2,{\"second\":2},3,4,[4,4],5,6]"
,'unique with mixed stuff - ECMA 5 mode with function key finder');

var a2=	[['one',1],['two',1],['three',1]];

IS( JSON.stringify( Array._unique(a2,function(x){return x[1];}) )
,"[[\"one\",1]]"
,'unique with mixed stuff - ECMA 5 mode with function key finder doing something');

IS( JSON.stringify( Array.unique(a2,function(x){return x[1];}) )
,"[[\"one\",1]]"
,'unique with mixed stuff - likely ECMA 6 mode with function key finder doing something');
