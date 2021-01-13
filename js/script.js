new Vue({
    el:'#main',
    data:{
        showHide:'height:5.3rem',
        toggle:true,
        id:'',
       
        title:[
            {id:1,name:'JavaScript DOM编程艺术',Historical:59.00,Price:47.20,gm:'购买',amount:1,del:'删除'},
            {id:2,name:'深入浅出MySQL数据库开发,优...',Historical:39.00,Price:29.30,gm:'购买',amount:1,del:'删除'},
            {id:3,name:'解禁(当当网独家首发)',Historical:34.80,Price:20.60,gm:'购买',amount:1,del:'删除'},
            {id:4,name:'大玩家(马未都,王刚推荐!央...)',Historical:28.00,Price:19.40,gm:'购买',amount:1,del:'删除'},
            {id:5,name:'地王之王(金融危机下房地产行...)',Historical:39.80,Price:30.50,gm:'购买',amount:1,del:'删除'},
            {id:6,name:'都市风水--官场风水小说:一...',Historical:32.80,Price:25.10,gm:'购买',amount:1,del:'删除'},
            {id:7,name:'逃庄',Historical:39.00,Price:17.30,gm:'购买',amount:1,del:'删除'},
            {id:8,name:'国戏',Historical:39.00,Price:27.70,gm:'购买',amount:1,del:'删除'},
        ],
        cart:[
            {id:1,name:'私募(首部披露资本博弈秘密的金融...)',little:189,market:32.00,dangdang:18.90,discount:'59折',amount:1,del:'删除'},
            {id:2,name:'小团圆(张玲最神秘小说遗稿)',little:173,market:28.00,dangdang:17.30,discount:'62折',amount:1,del:'删除'},
            {id:3,name:'不抱怨的世界(畅销全球80国的世界...)',little:154,market:24.80,dangdang:15.40,discount:'62折',amount:1,del:'删除'},
            {id:4,name:'福玛特双桶洗衣机XPB20-07S',little:358,market:458.00,dangdang:358.00,discount:'78折',amount:1,del:'删除'},
            {id:5,name:'PHP和MySQL Web（原书籍4版）',little:712,market:95.00,dangdang:71.20,discount:'75折',amount:1,del:'删除'},
            {id:6,name:'法布尔昆虫记',little:10,market:198.00,dangdang:130.70,discount:'66折',amount:1,del:'删除'},
        ],
    },
    //事件
    methods: {
        //显示隐藏
        switchs () {
            this.toggle = !this.toggle,
            this.showHide = (this.showHide=='height:0rem;')?"height:5.3rem;":"height:0rem;"
        },

        //点击购买
        purchase (index) {
            let add ={
                id:this.title[index].id+6,
                name:this.title[index].name,
                little:parseInt(this.title[index].Price)*10,
                market:this.title[index].Historical,
                dangdang:this.title[index].Price,
                del:this.title[index].del,
                amount:1,
                discount:parseFloat(10-this.title[index].Historical/this.title[index].Price).toFixed(2)+'折',
            }
            //去重    
            for(let i = 0;i < this.cart.length;i++){
                if(this.cart[i].id == add.id){
                    this.cart[i].amount++
                    return;
                }
            }
            //追加
            this.cart.push(add);
        },
        //减
        btnMinute (item,index) {
            item.amount--;
            if(item.amount<=0){
                this.cart.splice(index,1);
            }
        },
        //加
    　　btnAdd (item) {
            item.amount++
    　　},

        //删除
        del(item,index){
            this.cart.splice(index,1);
        },
        
        //结算
        settlement(){
            this.cart.splice('');
        },
    },
    //监听
    watch: {
        //深度监听---数组对象的值
		// 浅度监听---方法  ---具体的值
		// totalMoney(){}
        cart:{
            handler(newVal,oldVal){//深度监听到值发生变化之后触发的函数
                for (let i = 0; i < newVal.length; i++) {
                    if(isNaN(newVal[i].amount)){
                        newVal[i].amount = 1
                    }
                    if(newVal[i].amount == ""){
                        newVal[i].amount = 1
                    }
                    if(!parseInt(newVal[i].amount)){
                        newVal[i].amount = parseInt(newVal[i].amount)
                    }
                    if(parseInt(newVal[i].amount)){
                        newVal[i].amount = parseInt(newVal[i].amount)
                    }
                    if(newVal[i].amount <=1){
                        newVal[i].amount = 1
                    }
                }
            },
            deep:true//深度---是否开启深度监听，false---浅度，true---深度
        }
    },
    //计算属性
    computed: {
        // //总计
        total(){
            let totals = 0;
            for(let i=0;i<this.cart.length;i++){
                totals += Number(this.cart[i].dangdang * this.cart[i].amount);
            }
            return totals.toFixed(2);
        },
        //积分
        integral(){
            let integrals = 0;
            for(let i=0;i<this.cart.length;i++){
                integrals += Number(this.cart[i].little);
            }
            return integrals.toFixed(2);
        },

        //节省
        save(){
            let saves = 0;
            for(let i=0;i<this.cart.length;i++){
                saves += Number(this.cart[i].market - this.cart[i].dangdang);
            }
            return saves.toFixed(2);
        }
    }
})