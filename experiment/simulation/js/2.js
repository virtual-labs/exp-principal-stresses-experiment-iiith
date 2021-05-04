function matMult(a,b){
	var c = [];
	for(var i=0;i<3;i++)
		{	c[i]=[];
			for(var j=0;j<3;j++)
			{
				c[i][j] = 0;
			}
		}
		for(var i=0;i<3;i++)
		{
			for(var j=0;j<3;j++)
			{
				sum=0;
				for(k=0;k<3;k++)
				{
					sum = sum + a[i][k]*b[k][j];
				}
				c[i][j] = sum;
			}
		}		
		return c;

}
function calc(sxx,sxy,sxz,syx,syy,syz,szx,szy,szz,tx,ty,tz){
	var sinx=Math.sin(Math.PI/180*tx);
	var siny=Math.sin(Math.PI/180*ty);
	var sinz=Math.sin(Math.PI/180*tz);
	var cosx=Math.sin(Math.PI/180*tx);
	var cosy=Math.sin(Math.PI/180*ty);
	var cosz=Math.sin(Math.PI/180*tz);
	var rxx=cosy*cosz;
	var rxy=-sinz*cosy;
	var	rxz=siny;
	var ryx=sinx*siny*cosz + sinz*cosx;
	var ryy=-sinx*siny*sinz + cosx*cosz;
	var ryz=-sinx*cosy;
	var rzx=sinx*sinz - siny*cosx*cosz;
	var rzy=sinx*cosz + siny*sinz*cosx;
	var rzz=cosx*cosy;
	var r = [];
	var s = [];
	var rt = [];
	var sp =[];
	r.push([rxx,rxy,rxz]);
	r.push([ryx,ryy,ryz]);
	r.push([rzx,rzy,rzz]);
	rt.push([rxx,ryx,rzx]);
	rt.push([rxy,ryy,rzy]);
	rt.push([rxz,ryz,rzz]);
	s.push([sxx,sxy,sxz]);
	s.push([syx,syy,syz]);
	s.push([szx,szy,szz]);
	sp=matMult(matMult(r,s),rt);
	document.getElementById("bxx").innerHTML=sp[0][0];
	document.getElementById("bxy").innerHTML=sp[0][1];
	document.getElementById("bxz").innerHTML=sp[0][2];
	document.getElementById("byx").innerHTML=sp[1][0];
	document.getElementById("byy").innerHTML=sp[1][1];
	document.getElementById("byz").innerHTML=sp[1][2];
	document.getElementById("bzx").innerHTML=sp[2][0];
	document.getElementById("bzy").innerHTML=sp[2][1];
	document.getElementById("bzz").innerHTML=sp[2][2];
	}