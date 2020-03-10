/*
filter: Unique Items only
Order is guaranteed
JS Optimizer tip recommended avoiding prototypes on native types.
Old browser worst case of O(n**2) but only for objects in the Array (lack of mapping)
*/
// @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt
Array.unique=	function(array, f){//optional function(object){return property to compare;}
	if(f){
		var v,map=	new Map();
		for(var i=0;i<array.length;++i){//O(n)
			v=		f(array[i]);
			if( ! map.has(v) ){
				map.set( v, array[i] );
			}
		}
		return [...map.values()];
	}else return [...new Set(array)];
};
//#if ECMA < 6 || Firefox < 16 || Safari < 8 || Internet_Explorer < 12 || Chrome < 46 || Opera < 37
Array._unique=	function(array, f){
	var out=	[];
	var map=	{};//O(1)

	var slow=	[];//O(n*n)
	var value=	[];
	var ins=	[];//insertion point
	var mark=	[];

	var x;
	for(var i=0;i<array.length;++i){//O(n) for native types
		x=	f ? f(array[i]) : array[i];//for speed
		if( typeof x === 'object' ){
			slow.push(x);
			value.push(array[i]);
			ins.push(out.length);
		}else if( ! map[x] ){
			map[x]=	1;
			out.push(array[i]);
		}
	}
	//recycle x,i;
	for(i=x=0;i<slow.length;++i){//O(nn) but handles all types
		if( ! mark[i] ){
			out.splice( ins[i]+x++, 0, value[i] );
			for(var k=slow.length;--k>=i;){//half 2D matrix + self
				if( slow[i] === slow[k] ){
					mark[i]=	mark[k]=	1;
				}
			}
		}
	}
	return out;
};
(function(){
	try{
		let e;
		Array.unique([1,1]);
	}catch(e){
		Array.unique=	Array._unique;
	}
})();
//#endif
// @license-end