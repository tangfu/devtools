function date2String(secs){
	var d = new Date();
	d.setTime(secs * 1000);
	var rs = d.getFullYear() + "-";
	if (d.getMonth() < 9)
		rs += "0";
	rs += (d.getMonth()+1) + "-";
	if (d.getDate() < 10)
		rs += "0";
	rs += d.getDate() + " ";
	if (d.getHours() < 10)
		rs += "0";
	rs += d.getHours() + ":";
	if (d.getMinutes() < 10)
		rs += "0";
	rs += d.getMinutes() + ":";
	if (d.getSeconds() < 10)
		rs += "0";
	rs += d.getSeconds();
	return rs;
}
function string2stamp(str){
	var d = new Date(0);
	d.setFullYear(parseInt(str.substr(0, 4), 10));
	d.setMonth(parseInt(str.substr(5, 2), 10)-1);
	d.setDate(parseInt(str.substr(8, 2), 10));
	d.setHours(parseInt(str.substr(11, 2), 10));
	d.setMinutes(parseInt(str.substr(14, 2), 10));
	d.setSeconds(parseInt(str.substr(17, 2), 10));
	return Math.floor(d.getTime()/1000);
}
function int2byte(i){
	var arr = [];
	arr.push((i >> 24) & 0xFF);
	arr.push((i >> 16) & 0xFF);
	arr.push((i >> 8) & 0xFF);
	arr.push(i & 0xFF);
	return arr;
}
function byte2int(arr){
	var i = 0;
	i |= (arr[0] << 24) & 0xFF000000;
	i |= (arr[1] << 16) & 0x00FF0000;
	i |= (arr[2] << 8) & 0x0000FF00;
	i |= arr[3] & 0x000000FF;
	return i;
}
function rint(i){
	var r = 0;
	for (var j=0;j<4;j++){
		r = (r << 8) | ((i >> (j*8)) & 0xFF);
	}
	return r;
}
function rlong(l){
	var r = 0;
	for (var j=0;j<8;j++){
		r = (r << 8) | ((l >> (j*8)) & 0xFF);
	}
	return r;
}
function endianResult(domId, number, bytes){
	document.getElementById(domId).innerHTML = number + " = " + bytes.toString();
}
function writeText(domId, text){
	var dom = document.getElementById(domId);
	if (dom.innerText != undefined)
		dom.innerText = text;
	else
		dom.textContent = text;
}

/////////////////////////////////////////////////////
function onDate2String(){
	var re = new RegExp("^[0-9]{0,10}$");
	var t = document.getElementById("time_sec").value;
	if(re.test(t))
		document.getElementById("time_str").innerHTML = date2String(parseInt(t));
	else
		document.getElementById("time_str").innerHTML = "格式错误 只能是不超过10位的数字";
}
function onString2Date(){
	var re = new RegExp("^([0-9]{4})-([0-1][0-9])-([0-3][0-9]) ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$");
	var t = document.getElementById("time_sec").value;
	if(re.test(t))
		document.getElementById("time_str").innerHTML = string2stamp(t);
	else 
		document.getElementById("time_str").innerHTML = "格式错误 YY-MM-DD HH:MM:SS";
}
function onInt2IP(){
	var re = new RegExp("^[0-9]{0,10}$");
	t = document.getElementById("ip").value;
	if(re.test(t)) {
		var a = int2byte(parseInt(t));
		document.getElementById("ip_str").innerHTML = a.join(".");
	} else {
		document.getElementById("ip_str").innerHTML = "格式错误 只能为整型";
	}
}
function onIP2Int(){
	var re = new RegExp("^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$");
	var ip = document.getElementById("ip").value;
	if(re.test(ip)) {
		var a = ip.split(".");
		for (var x=0;x<a.length;x++){
			a[x] = parseInt(a[x]);
		}
		document.getElementById("ip_str").innerHTML = byte2int(a);
	} else {
		document.getElementById("ip_str").innerHTML = "ip地址格式不合法";
	}
}
function onRInt(){
	var n = document.getElementById("number").value;
	n = parseInt(n);
	var nb = int2byte(n);
	endianResult("endian_raw_str", n, nb);
	var rnb = nb.reverse();
	var rn = byte2int(rnb);
	endianResult("endian_new_str", rn, rnb);
}
function onRLong(){
	var n = document.getElementById("number").value;
	n = parseInt(n);
	var nbl = int2byte(n & 0xFFFFFFFF);
	var nbh = int2byte((n>>16>>16) & 0xFFFFFFFF); 
	var nb = [];
	for (var i=0;i<4;i++)
		nb.push(nbh[i]);
	for (var i=0;i<4;i++)
		nb.push(nbl[i]);
	endianResult("endian_raw_str", n, nb);
	var rnb = nb.reverse();
	var rnbl = [];
	for (var i=4;i<8;i++)
		rnbl.push(rnb[i]);
	var rnh = byte2int(rnb);
	var rnl = byte2int(rnbl);
	var rn = (rnh << 32) | rnl;
	endianResult("endian_new_str", rn, rnb);
}
function onURIEncode(){
	var v = document.getElementById("url_str").value;
	document.getElementById("url_result").innerHTML = encodeURIComponent(v);
}
function onURIDecode(){
	var v = document.getElementById("url_str").value;
	document.getElementById("url_result").innerHTML = decodeURIComponent(v);
}
function onTraditional2Simplified(){
	var v = document.getElementById("st_str").value;
	var target = [];
	for (var i=0;i<v.length;i++){
		var index = traditional.indexOf(v.charAt(i));
		if (index < 0)
			target.push(v.charAt(i));
		else
			target.push(simplified.charAt(index));
	}
	writeText("st_result", target.join(''));
}
function onSimplified2Traditional(){
	var v = document.getElementById("st_str").value;
	var target = [];
	for (var i=0;i<v.length;i++){
		var index = simplified.indexOf(v.charAt(i));
		if (index < 0)
			target.push(v.charAt(i));
		else
			target.push(traditional.charAt(index));
	}
	writeText("st_result", target.join(''));
}		
//////////


var traditional = '一七萬丈三上下不與醜專且世業東絲丟兩嚴喪個中豐串臨為主舉久麼義之乎乏樂乘九乞也習鄉書買亂了予爭事二於虧雲云互五井亞些亡交亦產享京亮親人億什仁僅仇今介仍從崙倉仔他付代令以們件價任份仿企伊伍休眾優伙夥會偉傳傷倫伯估伴伸似但位低住體何余餘佛作你佩佳佶使例供依僥側侵便促俊俗保信倆修俱倍倒候借值傾假偏做停健偶偷償傍儲催傻像僚僻兒元兄充兆先光克免黨入全八公六蘭共關興兵其具典茲養兼冀內冊再寫軍農冠冤冬衝沖決況冷淨淒準涼減湊幾凡鳳凱兇凶出擊函鑿分切刊劃列劉則剛創初刪判利別到制券刺刻劊劑削前剎剝劇剩割力勸辦功加務劣動助努劫勵勁勞勢勇勒募勤勾包匈化北匹區醫匿十千升午半華協單賣南博占佔卡衛印危即卻卵廠歷曆厲壓厭廁釐原廂厥去縣參又叉及友雙反發髮叔取受變口古句另只叫召可台臺史右葉號司吃各合吉同名後向嚮嚇呂嗎君吝吞否吧含聽啟吳吵吶吸吹吻吼吾呀告員呢周週味呵呼命咀和咖咧咽品哄哈哉響啞譁哥哪哭哲唉唯唱商啊啜啦善喊喔喜喧嗯嗲嘛嘲嘴嘶嘿噢器噩噪嚼四回因團園困圍固國圖圓圈土聖在地場址均壞坐塊堅壇坦壟型壘埋城培基堂堆墮堪堵塑塔塞填境墓牆增墟士壯聲殼壹處備複夕外多夜夠大天太夫央失頭誇夾奪奇奉奮奏契奔獎套奠奢女奴她好如婦媽妖妙妥妨妹始姑姓委薑姨姻威娃婁娘娛娶婆婚嬰媒嫉嫌子孔字存孫孤學孩孽寧它宅守安完宕宗官定宜寶實寵審客宣憲宰害家傢容寂寄密富寒察寡對尋導封射將尊小少爾尚嘗尤尬就尷尺盡尾局屁層居屈屆屋屎展屬山歲豈崗岸崇州工左巧鉅差己已巴巷幣市布師希帝帶席幫常幕幹乾平年並幸倖幻幼廣莊庇床序庫應底店府龐廢度座庭庶康庸廊廖延建開異棄弄弊式引弟張彌弱彈強歸當錄形彩彪彭彰影役徹彼往征徵徑逕待很律徒得微德徽心必憶忍志誌忘忙忠快念忽忿懷態愴怎怒怕憐思急性怨怪總戀恍恐恆恢恨恩息恰懇惡悉悔悟您懸憫悲情驚惑惕惜慘慣想愈意愚感憤願慈慢慰憾懂懶戍戲成我或戰戚截戴戶房所扁扈手才撲打扔託扛扣執擴掃揚扭扮扯擾批扼找承技抄抉把抑抒抓投抗摺折撫搶護報披抬抱抵押抽擔拆拉拍拒拓拖拘拚招拜擬攏擁撥擇括拼拿持掛指按挑挖擠揮挨挫振挺挽捅捉捐捕撈損換據掀掉掌掏掐排掘探接控推描提插握揣揪揭援擱搜搞攝擺搖攤摘摧摩撇撐撤撬播擅攢攫支收改攻放政故效敵敏救教斂敢散敬數整文鬥料斥斷斯新方施旁旅旋族旗無既日旦舊早時昌明昏易星春昧昨是顯曉晚普景晰晴智暫暇暑暖暗暴曲更曾替最月有朋服朔望朝期木未末本術機殺雜權材村束條來楊杯傑闆板極構枉析林果枯架某染查標棧欄樹校樣核根格框案桌檔樺桶夢梨梯檢棒棚椅楚樓概榜榨檻樟模橫欠次歡歐慾款歌止正此步武歧死殊殘段殷毀母每毒比畢毛毫民氣水永求彙漢江污汰沉沙溝沒淪河油治沾沿洩法泛泡波泣泥注淚泯泰澤洋洗洛津洪洲活派流淺測濟瀏渾濃浩浪浮海浸消涉湧濤渦滌潤漲液涵淘淡深混添清漸滲渡渣渥溫港遊游湖灣濕源滋滑滾滯滿滴漂漏演漩漫潘潛潮澡激灌火滅燈灰靈災燦炒炫炸點爛烈煩燒熱焉焦然煤照煽熊薰熟燃燥爆愛父爺爸爽片版牌牙牛牢物牲牽特犧犯狀猶狂狄狗獨狹獄狼猖猛猜獗率玉王玩環現珊班球理琴瑞瑟璋瓦瓶甚生用甫田由甲申電男畫暢界留略番疇疆疑療瘡疲病癢痛登白百皂的皆皇皮益監盒蓋盤盟目盯盲直相盼盾省看真眷眼著睛睡瞧瞭矛矣知短石礦碼研破砸礎硬確礙碗碣碧碰磁磨示社祖神票禁福離禽秀私種科秒秩積稱移稀程稍稅稚穩稻究窮空穿突窗立站競竟章童端竹竿笑筆符笨第等築答策箏籌簽籤簡算管篇籍類粉粒粗糧粹精糊糕蹧糟係素索緊紫累繁糾紅約級紀純綱納紛紙紐紓線練組紳細織終紹經結給絡絕統繼績緒續繩維綿綜綠緩締編縛縫縮繳缺網羅罷罪置署羊美羞群翔翱翻翼燿耀老考者而耐耗耳耶聳恥聾職聯聚肉肌肚肝股膚肩肪肯育腎脅胃膽背胚勝胞胡骼能脂脆脈臟髒腦腳脫臉腐腥騰臂自臭至致輿捨舍舒舞舟航般艦艙船良艱色藝節蘆芬花甦苟若苦英範茅茍草薦荒盪榮藥荼莎莫萊蓮穫獲菜營蕭落葬蒙蓄蓍藍蔑蔓薄薪藉藏慮虛蟲雖蝕蟻螞蚊蛋蛙蛛蜂蝴蝶融蠢血行衍衡衣補表袋袖被襲裁裂裝裸西要覆見觀規視覽覺角解觸言譽警譬計訂認討讓議訊記講諱訝許論諷設訪證評識訴詞譯試詩誠話詢該詳語誤說請諸讀課誰調諒談謀謊謂謝謠謾謬象貌貝負財責敗貨質販貪貧購貫貼貴費資賭賞賴贅賺賽贊讚贏赤赫走赴趕起超越趨趟趣足躍跋跑距跟跨路跳踐踏踩踮蹲身躲車軌轉輪軟轟輕載較輒輛輩輝輻輯輸辛辜辭辣辨辯辱邊達遷迅過邁迎運近返還這進遠違連迫述迷蹟跡追退送適逃逆選透逐遞途通逛速造逢逮逸邏遇遍遑道遺遙遭遮遵避鄧那郵鄰鄭部郭都酋配酒酷酸釀醒採釋裡重野量金針鈣鐘鋼欽鈕錢鑽鐵鉛銅鏟鏈銷鎖鋤錯錦鍵鍾鏢鏡長門閃閉問閒間悶鬧聞閡閱闕隊防陽陰陣階阻阿附際陸陳陋降限院除險陪陶陷隨隱隔隘障隸難雄集雇僱雛雨靂零雷需霄露霹青靜非靠面革鞋鞭韓音頁頂頃項順須顧頓頌預領頗頻穎題額風飛食餐饑飯飾飽餅餓館首香馬馭驅駁駝駕罵駱驗騎騙驟骨髓高鬼魂魏魚魯鮮鳴鴨鴦鴛鷹鹿麻黃黑鼎鼓鼠齊齒龍';

var simplified = '一七万丈三上下不与丑专且世业东丝丢两严丧个中丰串临为主举久么义之乎乏乐乘九乞也习乡书买乱了予争事二于亏云云互五井亚些亡交亦产享京亮亲人亿什仁仅仇今介仍从仑仓仔他付代令以们件价任份仿企伊伍休众优伙伙会伟传伤伦伯估伴伸似但位低住体何余余佛作你佩佳佶使例供依侥侧侵便促俊俗保信俩修俱倍倒候借值倾假偏做停健偶偷偿傍储催傻像僚僻儿元兄充兆先光克免党入全八公六兰共关兴兵其具典兹养兼冀内册再写军农冠冤冬冲冲决况冷净凄准凉减凑几凡凤凯凶凶出击函凿分切刊划列刘则刚创初删判利别到制券刺刻刽剂削前剎剥剧剩割力劝办功加务劣动助努劫励劲劳势勇勒募勤勾包匈化北匹区医匿十千升午半华协单卖南博占占卡卫印危即却卵厂历历厉压厌厕厘原厢厥去县参又叉及友双反发发叔取受变口古句另只叫召可台台史右叶号司吃各合吉同名后向向吓吕吗君吝吞否吧含听启吴吵吶吸吹吻吼吾呀告员呢周周味呵呼命咀和咖咧咽品哄哈哉响哑哗哥哪哭哲唉唯唱商啊啜啦善喊喔喜喧嗯嗲嘛嘲嘴嘶嘿噢器噩噪嚼四回因团园困围固国图圆圈土圣在地场址均坏坐块坚坛坦垄型垒埋城培基堂堆堕堪堵塑塔塞填境墓墙增墟士壮声壳壹处备复夕外多夜够大天太夫央失头夸夹夺奇奉奋奏契奔奖套奠奢女奴她好如妇妈妖妙妥妨妹始姑姓委姜姨姻威娃娄娘娱娶婆婚婴媒嫉嫌子孔字存孙孤学孩孽宁它宅守安完宕宗官定宜宝实宠审客宣宪宰害家家容寂寄密富寒察寡对寻导封射将尊小少尔尚尝尤尬就尴尺尽尾局屁层居屈届屋屎展属山岁岂岗岸崇州工左巧巨差己已巴巷币市布师希帝带席帮常幕干干平年并幸幸幻幼广庄庇床序库应底店府庞废度座庭庶康庸廊廖延建开异弃弄弊式引弟张弥弱弹强归当录形彩彪彭彰影役彻彼往征征径径待很律徒得微德徽心必忆忍志志忘忙忠快念忽忿怀态怆怎怒怕怜思急性怨怪总恋恍恐恒恢恨恩息恰恳恶悉悔悟您悬悯悲情惊惑惕惜惨惯想愈意愚感愤愿慈慢慰憾懂懒戍戏成我或战戚截戴户房所扁扈手才扑打扔托扛扣执扩扫扬扭扮扯扰批扼找承技抄抉把抑抒抓投抗折折抚抢护报披抬抱抵押抽担拆拉拍拒拓拖拘拚招拜拟拢拥拨择括拼拿持挂指按挑挖挤挥挨挫振挺挽捅捉捐捕捞损换据掀掉掌掏掐排掘探接控推描提插握揣揪揭援搁搜搞摄摆摇摊摘摧摩撇撑撤撬播擅攒攫支收改攻放政故效敌敏救教敛敢散敬数整文斗料斥断斯新方施旁旅旋族旗无既日旦旧早时昌明昏易星春昧昨是显晓晚普景晰晴智暂暇暑暖暗暴曲更曾替最月有朋服朔望朝期木未末本术机杀杂权材村束条来杨杯杰板板极构枉析林果枯架某染查标栈栏树校样核根格框案桌档桦桶梦梨梯检棒棚椅楚楼概榜榨槛樟模横欠次欢欧欲款歌止正此步武歧死殊残段殷毁母每毒比毕毛毫民气水永求汇汉江污汰沉沙沟没沦河油治沾沿泄法泛泡波泣泥注泪泯泰泽洋洗洛津洪洲活派流浅测济浏浑浓浩浪浮海浸消涉涌涛涡涤润涨液涵淘淡深混添清渐渗渡渣渥温港游游湖湾湿源滋滑滚滞满滴漂漏演漩漫潘潜潮澡激灌火灭灯灰灵灾灿炒炫炸点烂烈烦烧热焉焦然煤照煽熊熏熟燃燥爆爱父爷爸爽片版牌牙牛牢物牲牵特牺犯状犹狂狄狗独狭狱狼猖猛猜獗率玉王玩环现珊班球理琴瑞瑟璋瓦瓶甚生用甫田由甲申电男画畅界留略番畴疆疑疗疮疲病痒痛登白百皂的皆皇皮益监盒盖盘盟目盯盲直相盼盾省看真眷眼着睛睡瞧瞭矛矣知短石矿码研破砸础硬确碍碗碣碧碰磁磨示社祖神票禁福离禽秀私种科秒秩积称移稀程稍税稚稳稻究穷空穿突窗立站竞竟章童端竹竿笑笔符笨第等筑答策筝筹签签简算管篇籍类粉粒粗粮粹精糊糕糟糟系素索紧紫累繁纠红约级纪纯纲纳纷纸纽纾线练组绅细织终绍经结给络绝统继绩绪续绳维绵综绿缓缔编缚缝缩缴缺网罗罢罪置署羊美羞群翔翱翻翼耀耀老考者而耐耗耳耶耸耻聋职联聚肉肌肚肝股肤肩肪肯育肾胁胃胆背胚胜胞胡胳能脂脆脉脏脏脑脚脱脸腐腥腾臂自臭至致舆舍舍舒舞舟航般舰舱船良艰色艺节芦芬花苏苟若苦英范茅茍草荐荒荡荣药荼莎莫莱莲获获菜营萧落葬蒙蓄蓍蓝蔑蔓薄薪藉藏虑虚虫虽蚀蚁蚂蚊蛋蛙蛛蜂蝴蝶融蠢血行衍衡衣补表袋袖被袭裁裂装裸西要覆见观规视览觉角解触言誉警譬计订认讨让议讯记讲讳讶许论讽设访证评识诉词译试诗诚话询该详语误说请诸读课谁调谅谈谋谎谓谢谣谩谬象貌贝负财责败货质贩贪贫购贯贴贵费资赌赏赖赘赚赛赞赞赢赤赫走赴赶起超越趋趟趣足跃跋跑距跟跨路跳践踏踩踮蹲身躲车轨转轮软轰轻载较辄辆辈辉辐辑输辛辜辞辣辨辩辱边达迁迅过迈迎运近返还这进远违连迫述迷迹迹追退送适逃逆选透逐递途通逛速造逢逮逸逻遇遍遑道遗遥遭遮遵避邓那邮邻郑部郭都酋配酒酷酸酿醒采释里重野量金针钙钟钢钦钮钱钻铁铅铜铲链销锁锄错锦键锺镖镜长门闪闭问闲间闷闹闻阂阅阙队防阳阴阵阶阻阿附际陆陈陋降限院除险陪陶陷随隐隔隘障隶难雄集雇雇雏雨雳零雷需霄露霹青静非靠面革鞋鞭韩音页顶顷项顺须顾顿颂预领颇频颖题额风飞食餐饥饭饰饱饼饿馆首香马驭驱驳驼驾骂骆验骑骗骤骨髓高鬼魂魏鱼鲁鲜鸣鸭鸯鸳鹰鹿麻黄黑鼎鼓鼠齐齿龙';


//注册事件
		//$("#str_time").click(function () {
		//	onString2Date();
		//});
document.getElementById("time2str").addEventListener('click',onDate2String, false);
document.getElementById("str2time").addEventListener('click',onString2Date, false);

document.getElementById("int2ip").addEventListener('click',onInt2IP, false);
document.getElementById("ip2int").addEventListener('click',onIP2Int, false);

document.getElementById("big2little").addEventListener('click',onRInt, false);
document.getElementById("little2big").addEventListener('click',onRLong, false);

document.getElementById("urlencode").addEventListener('click',onURIEncode, false);
document.getElementById("urldecode").addEventListener('click',onURIDecode, false);

//document.getElementById("str2hex").addEventListener('click',onString2Bytes, false);
//document.getElementById("hex2str").addEventListener('click',onHexBytes2String, false);

document.getElementById("t2s").addEventListener('click',onTraditional2Simplified, false);
document.getElementById("s2t").addEventListener('click',onSimplified2Traditional, false);
