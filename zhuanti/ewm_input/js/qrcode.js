eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [
            function(e) {
                return d[e]
            }
        ];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}('x 2t(e){j.1m=R.1F;j.2q=e}x V(e,t){j.1b=e;j.1K=t;j.A=Y;j.E=0;j.1C=Y;j.1I=z N}x 1s(e,t){q(e.y==2x){U z W(e.y+"/"+t)}b n=0;Z(n<e.y&&e[n]==0){n++}j.2h=z N(e.y-n+t);k(b r=0;r<e.y-n;r++){j.2h[r]=e[r+n]}}x S(e,t){j.2K=e;j.2o=t}x 2l(){j.1y=z N;j.y=0}2t.2m={K:x(e){w j.2q.y},2v:x(e){k(b t=0;t<j.2q.y;t++){e.1a(j.2q.3L(t),8)}}};V.2m={3P:x(e){b t=z 2t(e);j.1I.2G(t);j.1C=Y},F:x(e,t){q(e<0||j.E<=e||t<0||j.E<=t){U z W(e+","+t)}w j.A[e][t]},2V:x(){w j.E},3h:x(){q(j.1b<1){b e=1;k(e=1;e<40;e++){b t=S.2D(e,j.1K);b n=z 2l;b r=0;k(b i=0;i<t.y;i++){r+=t[i].2o}k(b i=0;i<j.1I.y;i++){b s=j.1I[i];n.1a(s.1m,4);n.1a(s.K(),C.T(s.1m,e));s.2v(n)}q(n.T()<=r*8)2k}j.1b=e}j.2E(1J,j.2M())},2E:x(e,t){j.E=j.1b*4+17;j.A=z N(j.E);k(b n=0;n<j.E;n++){j.A[n]=z N(j.E);k(b r=0;r<j.E;r++){j.A[n][r]=Y}}j.2j(0,0);j.2j(j.E-7,0);j.2j(0,j.E-7);j.3c();j.3j();j.3d(e,t);q(j.1b>=7){j.3b(e)}q(j.1C==Y){j.1C=V.3z(j.1b,j.1K,j.1I)}j.3i(j.1C,t)},2j:x(e,t){k(b n=-1;n<=7;n++){q(e+n<=-1||j.E<=e+n)1k;k(b r=-1;r<=7;r++){q(t+r<=-1||j.E<=t+r)1k;q(0<=n&&n<=6&&(r==0||r==6)||0<=r&&r<=6&&(n==0||n==6)||2<=n&&n<=4&&2<=r&&r<=4){j.A[e+n][t+r]=1B}1i{j.A[e+n][t+r]=1J}}}},2M:x(){b e=0;b t=0;k(b n=0;n<8;n++){j.2E(1B,n);b r=C.2T(j);q(n==0||e>r){e=r;t=n}}w t},3K:x(e,t,n){b r=e.3M(t,n);b i=1;j.3h();k(b s=0;s<j.A.y;s++){b o=s*i;k(b u=0;u<j.A[s].y;u++){b a=u*i;b f=j.A[s][u];q(f){r.3O(0,2y);r.3R(a,o);r.2A(a+i,o);r.2A(a+i,o+i);r.2A(a,o+i);r.3Z()}}}w r},3j:x(){k(b e=8;e<j.E-8;e++){q(j.A[e][6]!=Y){1k}j.A[e][6]=e%2==0}k(b t=8;t<j.E-8;t++){q(j.A[6][t]!=Y){1k}j.A[6][t]=t%2==0}},3c:x(){b e=C.2O(j.1b);k(b t=0;t<e.y;t++){k(b n=0;n<e.y;n++){b r=e[t];b i=e[n];q(j.A[r][i]!=Y){1k}k(b s=-2;s<=2;s++){k(b o=-2;o<=2;o++){q(s==-2||s==2||o==-2||o==2||s==0&&o==0){j.A[r+s][i+o]=1B}1i{j.A[r+s][i+o]=1J}}}}}},3b:x(e){b t=C.2Y(j.1b);k(b n=0;n<18;n++){b r=!e&&(t>>n&1)==1;j.A[1e.1v(n/3)][n%3+j.E-8-3]=r}k(b n=0;n<18;n++){b r=!e&&(t>>n&1)==1;j.A[n%3+j.E-8-3][1e.1v(n/3)]=r}},3d:x(e,t){b n=j.1K<<3|t;b r=C.2X(n);k(b i=0;i<15;i++){b s=!e&&(r>>i&1)==1;q(i<6){j.A[i][8]=s}1i q(i<8){j.A[i+1][8]=s}1i{j.A[j.E-15+i][8]=s}}k(b i=0;i<15;i++){b s=!e&&(r>>i&1)==1;q(i<8){j.A[8][j.E-i-1]=s}1i q(i<9){j.A[8][15-i-1+1]=s}1i{j.A[8][15-i-1]=s}}j.A[j.E-8][8]=!e},3i:x(e,t){b n=-1;b r=j.E-1;b i=7;b s=0;k(b o=j.E-1;o>0;o-=2){q(o==6)o--;Z(1B){k(b u=0;u<2;u++){q(j.A[r][o-u]==Y){b a=1J;q(s<e.y){a=(e[s]>>>i&1)==1}b f=C.3f(t,r,o-u);q(f){a=!a}j.A[r][o-u]=a;i--;q(i==-1){s++;i=7}}}r+=n;q(r<0||j.E<=r){r-=n;n=-n;2k}}}}};V.3n=4m;V.2S=17;V.3z=x(e,t,n){b r=S.2D(e,t);b i=z 2l;k(b s=0;s<n.y;s++){b o=n[s];i.1a(o.1m,4);i.1a(o.K(),C.T(o.1m,e));o.2v(i)}b u=0;k(b s=0;s<r.y;s++){u+=r[s].2o}q(i.T()>u*8){U z W("3W y 3T. ("+i.T()+">"+u*8+")")}q(i.T()+4<=u*8){i.1a(0,4)}Z(i.T()%8!=0){i.2u(1J)}Z(1B){q(i.T()>=u*8){2k}i.1a(V.3n,8);q(i.T()>=u*8){2k}i.1a(V.2S,8)}w V.3H(i,r)};V.3H=x(e,t){b n=0;b r=0;b i=0;b s=z N(t.y);b o=z N(t.y);k(b u=0;u<t.y;u++){b a=t[u].2o;b f=t[u].2K-a;r=1e.3A(r,a);i=1e.3A(i,f);s[u]=z N(a);k(b l=0;l<s[u].y;l++){s[u][l]=2g&e.1y[l+n]}n+=a;b c=C.3o(f);b h=z 1s(s[u],c.K()-1);b p=h.2z(c);o[u]=z N(c.K()-1);k(b l=0;l<o[u].y;l++){b d=l+p.K()-o[u].y;o[u][l]=d>=0?p.1h(d):0}}b v=0;k(b l=0;l<t.y;l++){v+=t[l].2K}b m=z N(v);b g=0;k(b l=0;l<r;l++){k(b u=0;u<t.y;u++){q(l<s[u].y){m[g++]=s[u][l]}}}k(b l=0;l<i;l++){k(b u=0;u<t.y;u++){q(l<o[u].y){m[g++]=o[u][l]}}}w m};b R={1P:1<<0,1W:1<<1,1F:1<<2,2a:1<<3};b 1L={L:1,M:0,Q:3,H:2};b 1c={3E:0,3C:1,3y:2,3s:3,3t:4,3r:5,3q:6,3l:7};b C={3k:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,P],[6,30,B],[6,32,1g],[6,34,2i],[6,26,46,2Q],[6,26,48,1u],[6,26,P,J],[6,30,B,1w],[6,30,3F,2r],[6,30,1g,1p],[6,34,2i,2J],[6,28,P,4e,4d],[6,26,P,J,1X],[6,30,B,1w,2f],[6,28,B,1V,2s],[6,32,1g,3u,1R],[6,30,1g,1p,1D],[6,34,2i,2J,1x],[6,26,P,J,1X,1l],[6,30,B,1w,2f,3m],[6,26,4c,1w,4f,4g],[6,30,3F,2r,1Y,2Z],[6,34,2C,1p,3w,2R],[6,30,1g,1p,1D,2e],[6,34,2i,2J,1x,1n],[6,30,B,1w,2f,3m,2U],[6,24,P,1j,2f,3e,4i],[6,28,B,1V,2s,3x,4h],[6,32,1g,3u,1R,2w,4a],[6,26,B,2r,1R,2R,4s],[6,30,1g,1p,1D,2e,4q]],2c:1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0,1U:1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0,3G:1<<14|1<<12|1<<10|1<<4|1<<1,2X:x(e){b t=e<<10;Z(C.1f(t)-C.1f(C.2c)>=0){t^=C.2c<<C.1f(t)-C.1f(C.2c)}w(e<<10|t)^C.3G},2Y:x(e){b t=e<<12;Z(C.1f(t)-C.1f(C.1U)>=0){t^=C.1U<<C.1f(t)-C.1f(C.1U)}w e<<12|t},1f:x(e){b t=0;Z(e!=0){t++;e>>>=1}w t},2O:x(e){w C.3k[e-1]},3f:x(e,t,n){1N(e){D 1c.3E:w(t+n)%2==0;D 1c.3C:w t%2==0;D 1c.3y:w n%3==0;D 1c.3s:w(t+n)%3==0;D 1c.3t:w(1e.1v(t/2)+1e.1v(n/3))%2==0;D 1c.3r:w t*n%2+t*n%3==0;D 1c.3q:w(t*n%2+t*n%3)%2==0;D 1c.3l:w(t*n%3+(t+n)%2)%2==0;1G:U z W("2N 3N:"+e)}},3o:x(e){b t=z 1s([1],0);k(b n=0;n<e;n++){t=t.3I(z 1s([1,I.1S(n)],0))}w t},T:x(e,t){q(1<=t&&t<10){1N(e){D R.1P:w 10;D R.1W:w 9;D R.1F:w 8;D R.2a:w 8;1G:U z W("1m:"+e)}}1i q(t<27){1N(e){D R.1P:w 12;D R.1W:w 11;D R.1F:w 16;D R.2a:w 10;1G:U z W("1m:"+e)}}1i q(t<41){1N(e){D R.1P:w 14;D R.1W:w 13;D R.1F:w 16;D R.2a:w 12;1G:U z W("1m:"+e)}}1i{U z W("3J:"+t)}},2T:x(e){b t=e.2V();b n=0;k(b r=0;r<t;r++){k(b i=0;i<t;i++){b s=0;b o=e.F(r,i);k(b u=-1;u<=1;u++){q(r+u<0||t<=r+u){1k}k(b a=-1;a<=1;a++){q(i+a<0||t<=i+a){1k}q(u==0&&a==0){1k}q(o==e.F(r+u,i+a)){s++}}}q(s>5){n+=3+s-5}}}k(b r=0;r<t-1;r++){k(b i=0;i<t-1;i++){b f=0;q(e.F(r,i))f++;q(e.F(r+1,i))f++;q(e.F(r,i+1))f++;q(e.F(r+1,i+1))f++;q(f==0||f==4){n+=3}}}k(b r=0;r<t;r++){k(b i=0;i<t-6;i++){q(e.F(r,i)&&!e.F(r,i+1)&&e.F(r,i+2)&&e.F(r,i+3)&&e.F(r,i+4)&&!e.F(r,i+5)&&e.F(r,i+6)){n+=40}}}k(b i=0;i<t;i++){k(b r=0;r<t-6;r++){q(e.F(r,i)&&!e.F(r+1,i)&&e.F(r+2,i)&&e.F(r+3,i)&&e.F(r+4,i)&&!e.F(r+5,i)&&e.F(r+6,i)){n+=40}}}b l=0;k(b i=0;i<t;i++){k(b r=0;r<t;r++){q(e.F(r,i)){l++}}}b c=1e.3Q(2y*l/t/t-P)/5;n+=c*10;w n}};b I={1r:x(e){q(e<1){U z W("1r("+e+")")}w I.2B[e]},1S:x(e){Z(e<0){e+=2g}Z(e>=2d){e-=2g}w I.X[e]},X:z N(2d),2B:z N(2d)};k(b i=0;i<8;i++){I.X[i]=1<<i}k(b i=8;i<2d;i++){I.X[i]=I.X[i-4]^I.X[i-5]^I.X[i-6]^I.X[i-8]}k(b i=0;i<2g;i++){I.2B[I.X[i]]=i}1s.2m={1h:x(e){w j.2h[e]},K:x(){w j.2h.y},3I:x(e){b t=z N(j.K()+e.K()-1);k(b n=0;n<j.K();n++){k(b r=0;r<e.K();r++){t[n+r]^=I.1S(I.1r(j.1h(n))+I.1r(e.1h(r)))}}w z 1s(t,0)},2z:x(e){q(j.K()-e.K()<0){w j}b t=I.1r(j.1h(0))-I.1r(e.1h(0));b n=z N(j.K());k(b r=0;r<j.K();r++){n[r]=j.1h(r)}k(b r=0;r<e.K();r++){n[r]^=I.1S(I.1r(e.1h(r))+t)}w(z 1s(n,0)).2z(e)}};S.1M=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,1u,G],[1,1u,44],[2,35,17],[2,35,13],[1,2y,1V],[2,P,32],[2,P,24],[4,25,9],[1,2Z,1Y],[2,2H,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,1p,1Z],[4,43,27],[4,43,19],[4,43,15],[2,1X,1w],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,1E,4r],[2,2C,38,2,3D,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,1n,1d],[3,1g,36,2,1O,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,1p,1Z,2,2P,2F],[4,2F,43,1,1u,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,4p,3g],[1,1V,P,4,3g,1t],[4,P,22,4,1t,23],[3,36,12,8,37,13],[2,1d,4l,2,1A,4t],[6,1g,36,2,1O,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,3p,2b],[8,1O,37,1,2C,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,1o,1q,1,1n,1d],[4,2W,40,5,2L,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,4u,2P,1,1R,3S],[5,2L,41,5,2Q,42],[5,B,24,7,G,25],[11,36,12],[5,1l,1X,1,1T,4z],[7,1H,45,3,J,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,3B,2b,5,2w,1Y],[10,J,46,1,O,47],[1,P,22,15,1t,23],[2,42,14,17,43,15],[5,2U,4y,1,1Q,1E],[9,2F,43,4,1u,44],[17,P,22,1,1t,23],[2,42,14,19,43,15],[3,4w,4x,4,2e,1D],[3,1u,44,11,4v,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,3B,2b,5,2w,1Y],[3,2H,41,13,1Z,42],[15,B,24,5,G,25],[15,43,15,10,44,16],[4,4j,1d,4,1o,1A],[17,1Z,42],[17,P,22,6,1t,23],[19,46,16,6,47,17],[2,3Y,4k,7,3X,3w],[17,J,46],[7,B,24,16,G,25],[34,37,13],[4,1Q,1E,5,1z,1l],[4,O,47,14,1j,48],[11,B,24,14,G,25],[16,45,15,14,46,16],[6,2n,1A,4,2p,1x],[6,1H,45,14,J,46],[11,B,24,16,G,25],[30,46,16,2,47,17],[8,3x,2s,4,3p,2b],[8,O,47,13,1j,48],[7,B,24,22,G,25],[22,45,15,13,46,16],[10,2e,1D,2,3U,1q],[19,J,46,4,O,47],[28,P,22,6,1t,23],[33,46,16,4,47,17],[8,1z,1l,4,2I,1T],[22,1H,45,3,J,46],[8,3v,23,26,B,24],[12,45,15,28,46,16],[3,2n,1A,10,2p,1x],[3,1H,45,23,J,46],[4,B,24,31,G,25],[11,45,15,31,46,16],[7,1n,1d,7,2n,1A],[21,1H,45,7,J,46],[1,3v,23,37,B,24],[19,45,15,26,46,16],[5,1o,1q,10,1n,1d],[19,O,47,10,1j,48],[15,B,24,25,G,25],[23,45,15,25,46,16],[13,1o,1q,3,1n,1d],[2,J,46,29,O,47],[42,B,24,1,G,25],[23,45,15,28,46,16],[17,1o,1q],[10,J,46,23,O,47],[10,B,24,35,G,25],[19,45,15,35,46,16],[17,1o,1q,1,1n,1d],[14,J,46,21,O,47],[29,B,24,19,G,25],[11,45,15,46,46,16],[13,1o,1q,6,1n,1d],[14,J,46,23,O,47],[44,B,24,7,G,25],[1O,46,16,1,47,17],[12,1Q,1E,7,1z,1l],[12,O,47,26,1j,48],[39,B,24,14,G,25],[22,45,15,41,46,16],[6,1Q,1E,14,1z,1l],[6,O,47,34,1j,48],[46,B,24,10,G,25],[2,45,15,2W,46,16],[17,1z,1l,4,2I,1T],[29,J,46,14,O,47],[49,B,24,10,G,25],[24,45,15,46,46,16],[4,1z,1l,18,2I,1T],[13,J,46,32,O,47],[48,B,24,14,G,25],[42,45,15,32,46,16],[20,2n,1A,4,2p,1x],[40,O,47,7,1j,48],[43,B,24,22,G,25],[10,45,15,2H,46,16],[19,2p,1x,6,4b,3V],[18,O,47,31,1j,48],[34,B,24,34,G,25],[20,45,15,3D,46,16]];S.2D=x(e,t){b n=S.3a(e,t);q(n==2x){U z W("2N 4n 4o @ 1b:"+e+"/1K:"+t)}b r=n.y/3;b i=z N;k(b s=0;s<r;s++){b o=n[s*3+0];b u=n[s*3+1];b a=n[s*3+2];k(b f=0;f<o;f++){i.2G(z S(u,a))}}w i};S.3a=x(e,t){1N(t){D 1L.L:w S.1M[(e-1)*4+0];D 1L.M:w S.1M[(e-1)*4+1];D 1L.Q:w S.1M[(e-1)*4+2];D 1L.H:w S.1M[(e-1)*4+3];1G:w 2x}};2l.2m={1h:x(e){b t=1e.1v(e/8);w(j.1y[t]>>>7-e%8&1)==1},1a:x(e,t){k(b n=0;n<t;n++){j.2u((e>>>t-n-1&1)==1)}},T:x(){w j.y},2u:x(e){b t=1e.1v(j.y/8);q(j.1y.y<=t){j.1y.2G(0)}q(e){j.1y[t]|=3e>>>j.y%8}j.y++}}', 62, 284, '|||||||||||var||||||||this|for||||||if||||||return|function|length|new|modules|54|QRUtil|case|moduleCount|isDark|55||QRMath|74|getLength|||Array|75|50||QRMode|QRRSBlock|getLengthInBits|throw|QRCode|Error|EXP_TABLE|null|while|||||||||||put|typeNumber|QRMaskPattern|116|Math|getBCHDigit|58|get|else|76|continue|122|mode|146|145|86|115|glog|QRPolynomial|51|70|floor|78|118|buffer|152|117|true|dataCache|114|121|MODE_8BIT_BYTE|default|73|dataList|false|errorCorrectLevel|QRErrorCorrectLevel|RS_BLOCK_TABLE|switch|59|MODE_NUMBER|151|110|gexp|123|G18|80|MODE_ALPHA_NUM|98|108|68|||||||||||MODE_KANJI|107|G15|256|142|102|255|num|62|setupPositionProbePattern|break|QRBitBuffer|prototype|147|dataCount|148|data|82|106|QR8bitByte|putBit|write|136|undefined|100|mod|lineTo|LOG_TABLE|60|getRSBlocks|makeImpl|69|push|67|153|90|totalCount|65|getBestMaskPattern|bad|getPatternPosition|87|66|138|PAD1|getLostPoint|150|getModuleCount|64|getBCHTypeInfo|getBCHTypeNumber|134|||||||||||getRsBlockTable|setupTypeNumber|setupPositionAdjustPattern|setupTypeInfo|128|getMask|81|make|mapData|setupTimingPattern|PATTERN_POSITION_TABLE|PATTERN111|126|PAD0|getErrorCorrectPolynomial|133|PATTERN110|PATTERN101|PATTERN011|PATTERN100|84|53|112|132|PATTERN010|createData|max|135|PATTERN001|61|PATTERN000|56|G15_MASK|createBytes|multiply|type|createMovieClip|charCodeAt|createEmptyMovieClip|maskPattern|beginFill|addData|abs|moveTo|88|overflow|143|119|code|140|139|endFill|||||||||||162|149|52|94|72|104|130|158|154|144|111|92|236|rs|block|101|170|97|166|93|109|71|141|113|120|99'.split('|'), 0, {}))