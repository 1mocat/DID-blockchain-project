import Web3 from 'web3';
import InheritanceContract from '../../build/contracts/InheritanceContract.json'

var _account;
var _index;

const App = {
  web3: null,
  account: null,
  auction: null,
  Accounts: null,
  PubKey: [ '0x033efbc25d5059b58109b24e5f0915d57781d8ce6ef4b3aab8b7f6330558730d', 
            '0xbd5b43916d70d4a0289e1707d8bdc900f358c894359505b1ffc8452774a0a420', 
            '0x5c943484edbc6431246d414a305e535b1cd1d0a8d8d6b8c42acb31123f248431', 
            '0xcdad87bbf9a74e98e11c1429694576b5df32ad51ed8e5cc736031c6102d30932', 
            '0xffac486b4aa1ee37b6b31956017116ee539f3269d53a37ff8a2f38d6700ae431', 
            '0x37e4364e6814840a3915ae4bcdf18f35df6421e3d883583ae3e71f4d8cf1c030', 
            '0xd7d3eb5b0cca7c0198113d8a9ad48dec9baed2ab754f4103c38246fb8a047fe5', 
            '0xb1d39802105b8fa7787eebe2762da2d73186bdea1a4d2b8fca585af06d304c47', 
            '0x5c6fc6e5a47da3e028d4416545a4ce3aee9c3a0a896368fc0755fa27197326fa', 
            '0xcf26d62daa5cbe7f519ff81fe3ed816f775e9fc9d374dd92f9c0a017d792c4ca'],       //TODO  内置公钥私钥信息
  PriKey: ['0xd78452abcd3e10151bed203109ca34bf4232c01e7f1f709fb0b1dae16d9d1985',
           '0x32600d490301d98336e6cd19ea0248b3aa2ef95bb6b31420ee8753aa73678d45',
           '0xb45690238ebc472094546d0ab1217d0af2234d973d77c6fa1dd9352e50945e99', 
           '0x04ab49cc55c261cb09e3e1eb8472ca8c2c1f2b7b180cc2ea6c82afa882d5271f', 
           '0x2614f961b5fc3f73f52d0943985fc6246d1f3e05a5f3649a1dd9b509d7261400', 
           '0x66fe6a7a5f577fba8ce478362ff220e4424019bf6078bf5246931af267a82c3e', 
           '0xc10876575bec146ac211c03e427418cbdc6e89439479dd988841d0c28483fd08', 
           '0x6a6dda499834ec831f789a0bb722f62ea76e24a2ed0697e1138fb19df9fb45a5', 
           '0xd0773c1453b611311ad9edb5f8fb48a0d678de37d511319b1eb66816a92a2852', 
           '0xa5753316058092ab43b5aafdde43325bfd19e375a12a6336599ada0607fd9329'],       //TODO  login对应的密码需要更改
  index: 0,

  /**
   * 初始化函数，问题：APP中的account如何选取？
   */

  start: async function () {
    const { web3 } = this;    //获取web3对象
    console.log("in start");
    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = InheritanceContract.networks[networkId];
      this.auction = new web3.eth.Contract(
        InheritanceContract.abi,
        deployedNetwork.address,
      );

      this.Accounts = await web3.eth.getAccounts();

      //then initial users
      const transactionObject = {
        from: this.Accounts[0],
        to: this.Accounts[1],
        gas: 6000000
      };
      const { get_initial } = this.auction.methods;
      const { set_initial } = this.auction.methods;
      const { setUserInfo } = this.auction.methods;
      var is_init = await get_initial().call();
      if (!is_init) {
        for (var i = 0; i < this.Accounts.length; i++) {
          await setUserInfo(this.Accounts[i], true).send(transactionObject);
        }
        await set_initial(true).send(transactionObject);
      }

      //initial this.account
      const { addAc } = this.auction.methods;
      const { getacAccount } = this.auction.methods;
      const { getacIndex } = this.auction.methods;
      const { getacCount } = this.auction.methods;
      var length = await getacCount().call();
      if (length == 0) {
        //do nothing
      }
      else {
        this.account = await getacAccount(length - 1).call();
        this.index = await getacIndex(length - 1).call();
      }
      this.ShowAddr();
    } catch (error) {
      console.log(error);
    }
  },


  /**
   * 登入函数，需要两个参数account key
   * 更改account的对应用户在此处   OK
   */
  LogIn: async function () {
    var addr = document.getElementById("account").value;
    var key = document.getElementById("password").value;
    var right = false;
    for (var i = 0; i < this.Accounts.length; i++) {
      if ((addr) == this.Accounts[i].toString() && key == this.PriKey[i]) {
        this.account = this.Accounts[i];
        this.index = i;
        right = true;
        break;
      }
    }
    //

    if (right) {
      const { addAc } = this.auction.methods;
      await addAc(this.account, this.index).send({ from: this.account });
      window.location.href = 'UserAgreement.html';
    }
    else {
      alert("登陆失败");
    }
  },

  /**
   *用户死亡，更新用户的存活状态
   *is this function need a addr?
   *add one function queryUserInfo to check wehther user is deth
   */
  Deth: async function () {
    const transactionObject = {
      from: this.Accounts[0],
      to: this.Accounts[1],
      gas: 6000000  // 适当设置足够的 gas 限制
      // 其他参数...
    };
    const { getUserInfo } = this.auction.methods;
    const { setUserInfo } = this.auction.methods;
    var success = await setUserInfo(this.account, false).send(transactionObject);
    alert('遗产释放成功！');
  },

  /**
   * 查询当前的绑定账户，无需参数
   * 需要一个返回值   标签Bindings  返回查找的结果
   */
  QueryMyBinding: async function () {

    const { getBindingCount } = this.auction.methods;
    const { getBindingAddress_1 } = this.auction.methods;
    const { getBindingAddress_2 } = this.auction.methods;
    const { getBindingRelationship } = this.auction.methods;

    const element = document.getElementById("Bindings");
    element.innerHTML = '\0';

    var num, addr1, addr2, relationship;
    num = await getBindingCount().call();
    for (var i = 1; i <= num; i++) {
      addr1 = await getBindingAddress_1(i - 1).call();
      addr2 = await getBindingAddress_2(i - 1).call();
      relationship = await getBindingRelationship(i - 1).call();
      var j=0;
      for(j=0;j<this.Accounts.length;j++){
        if(addr2 == this.Accounts[j]){
          break;
        }
      }
      if (addr1 == this.account) {
        var x = "<tr>" + "<td>" + addr2 + "</td>" + "<td>" + this.PubKey[j==this.Accounts.length?j-1:j] + "</td>" + "<td>" + relationship + "</td>" + "</tr>";
        element.innerHTML = element.innerHTML + x;
      }
    }
  },
  /**
   * 创建一个绑定，需要参数addr2 relationship
   * 需要一个返回值说明绑定失败或成功
   * 调用这个函数之后在调用querymybinding刷新页面信息 
   */
  AddBinding: async function () {
    const { addBinding } = this.auction.methods;
    const { getBindingCount } = this.auction.methods;
    const { getBindingAddress_1 } = this.auction.methods;
    const { getBindingAddress_2 } = this.auction.methods;
    const { setBindingIgnored } = this.auction.methods;

    const transactionObject = {
      from: this.Accounts[0],
      to: this.Accounts[1],
      gas: 6000000  // 适当设置足够的 gas 限制
      // 其他参数...
    };

    var addr2, relationship, num, q_addr1, q_addr2, pubkeyRight = false, isMyself = false;
    var j;
    addr2 = document.getElementById("Address").value;
    relationship = document.getElementById("Relation").value;
    var qpubkey = document.getElementById("Pubkey").value;

    num = await getBindingCount().call();
    //if this binding is exit
    var isExit = false, success;
    for (var i = 0; i < num; i++) {
      q_addr1 = await getBindingAddress_1(i).call();
      q_addr2 = await getBindingAddress_2(i).call();
      if ((q_addr1 == this.account && q_addr2.toString() == addr2)) isExit = true;
      for (j = 0; j < this.Accounts.length; j++) {
        if (addr2 == this.Accounts[j]) break;
      }

      if ((qpubkey == this.PubKey[j].toString())) pubkeyRight = true;
      if (this.account == addr2) isMyself = true;
      
    }
    if(num == 0) {pubkeyRight = true;}
    if(this.account == addr2) isMyself = true; 

    if (isExit) {  //当前关系已经存在，无需再次绑定  返回值？
      alert("绑定已经存在！");
    } else if (!pubkeyRight) {
      alert("绑定失败！");
    } else if (isMyself) {
      alert("禁止绑定自己！");
    }
    else {
      await addBinding(this.account, (addr2), relationship).send(transactionObject);
      await setBindingIgnored(num,false).send(transactionObject);
      this.QueryMyBinding();
      alert("添加绑定成功");
    }
  },
  /**r
   * 查询我所有的分配 无需参数
   * 需要一个返回值Alloc返回查找的结果 
   */
  QueryMyAlloc: async function () {
    const { getInheritanceAddress_1 } = this.auction.methods;
    const { getInheritanceAddress_2 } = this.auction.methods;
    const { getInheritanceCount } = this.auction.methods;
    const { getInheritanceData } = this.auction.methods;
    const { getInheritanceID } = this.auction.methods;
    const { getBindingCount } = this.auction.methods;
    const { getBindingAddress_1 } = this.auction.methods;
    const { getBindingAddress_2 } = this.auction.methods;
    const { getBindingRelationship } = this.auction.methods;
    var bindNum, num, addr1, addr2, data, relationship = null, allocID, baddr1, baddr2;
    const element = document.getElementById("Alloc"); 
    num = await getInheritanceCount().call();
    bindNum = await getBindingCount().call();
    console.log(num);
    console.log(bindNum);
    element.innerHTML = '\0'; //清空


    for (var i = 0; i < num; i++) {
      addr1 = await getInheritanceAddress_1(i).call();
      addr2 = await getInheritanceAddress_2(i).call();
      data = await getInheritanceData(i).call();
      allocID = await getInheritanceID(i).call();

      console.log(addr1);
      console.log(addr2);

      if (addr1 == this.account) {
        for (var j = 0; j < bindNum; j++) {
          baddr1 = await getBindingAddress_1(j).call();
          baddr2 = await getBindingAddress_2(j).call();
          if (baddr1 == addr1 && baddr2 == addr2) {
            relationship = await getBindingRelationship(j).call();
          }
        }
        var x = "<tr>" + "<td>" + allocID + "</td>" + "<td>" + addr2 + "</td>" + "<td>" + relationship + "</td>" + "<td>" + data + "</td>" + "</tr>"; 
        element.innerHTML = element.innerHTML + x;
      }
    }

  },
  /**
   * 新建遗产 需要参数    addr2 data  
   * 需要一个返回值说明新建成功与否
   */
  AddOneAlloc: async function () {
    const { getBindingCount } = this.auction.methods;
    const { getBindingAddress_1 } = this.auction.methods;
    const { getBindingAddress_2 } = this.auction.methods;
    const { getBindingRelationship } = this.auction.methods;

    const { getInheritanceAddress_1 } = this.auction.methods;
    const { getInheritanceAddress_2 } = this.auction.methods;
    const { getInheritanceCount } = this.auction.methods;
    const { getInheritanceData } = this.auction.methods;
    const { addInheritance } = this.auction.methods;

    const transactionObject = {
      from: this.Accounts[0],
      to: this.Accounts[1],
      gas: 6000000  // 适当设置足够的 gas 限制
      // 其他参数...
    };

    var addr2, data, is_bind = false, q_addr1, q_addr2, bind_num, pubkey;
    addr2 = document.getElementById("Address").value;
    data = document.getElementById("Content").value;
    //pubkey = document.getElementById("Pubkey").value;
    bind_num = await getBindingCount().call();
    //检测addr2和当前的account是否有绑定is_bind
    for (var i = 0; i < bind_num; i++) {
      q_addr1 = await getBindingAddress_1(i).call();
      q_addr2 = await getBindingAddress_2(i).call();
      if (q_addr1 == this.account && q_addr2.toString() == addr2) { is_bind = true; break; }
    }
    if (!is_bind) {
      alert("并未绑定对方账户！");
    }
    else {
      await addInheritance(this.account, addr2, data).send(transactionObject);
      this.QueryMyAlloc();
      alert("成功分配遗产！");
    }
  },
  /**
   * 删除一个遗产分配 需要参数 AllocID
   * 
   */
  DeleteOneAlloc: async function () {
    const { removeInheritance } = this.auction.methods;
    const { getInheritanceCount } = this.auction.methods;
    const { getInheritanceID } = this.auction.methods;
    var qAllocID, i, num, isExit = false;

    const transactionObject = {
      from: this.Accounts[0],
      to: this.Accounts[1],
      gas: 6000000  // 适当设置足够的 gas 限制
      // 其他参数...
    };
    num = await getInheritanceCount().call();
    var AllocID = document.getElementById("ID").value;

    for (i = 0; i < num; i++) {
      qAllocID = await getInheritanceID(i).call();
      console.log(qAllocID);
      console.log(AllocID);
      if (qAllocID == AllocID) {
        isExit = true;
        break;
      }
    }
    if (isExit) {
      var success = await removeInheritance(i).send(transactionObject);
      this.QueryMyAlloc();
      alert("成功删除遗产分配");
    } else {
      alert("遗产不存在");
    }
  },
  /**
   * 检测我能得到的遗产 无需参数
   * 需要一个标签ToMyAlloc用于返回值
   */
  CheckMyInher: async function () {
    //AllocID 赠与人地址addr1 之间的关系relationship 获取状态state(老东西爆金币了没)
    const { getInheritanceCount } = this.auction.methods;
    const { getInheritanceAddress_1 } = this.auction.methods;
    const { getInheritanceAddress_2 } = this.auction.methods;
    const { getInheritanceData } = this.auction.methods;
    const { getBindingRelationship } = this.auction.methods;
    const { getBindingAddress_1 } = this.auction.methods;
    const { getBindingAddress_2 } = this.auction.methods;
    const { getBindingCount } = this.auction.methods;
    const { getInheritanceID } = this.auction.methods;
    const { getUserInfo } = this.auction.methods;
    const { getBindingIgnored } = this.auction.methods;

    const element = document.getElementById("Inher");
    element.innerHTML = '\0';

    var AllocID, addr1, addr2, relationship, state,is_ignore = false;
    var AllocNum;
    var bindNum = await getBindingCount().call();
    AllocNum = await getInheritanceCount().call();
    for (var i = 0; i < AllocNum; i++) {
      AllocID = await getInheritanceID(i).call();
      addr1 = await getInheritanceAddress_1(i).call();
      addr2 = await getInheritanceAddress_2(i).call();
      //data = getInheritanceData(i).call();
      if (addr2 == this.account) {
        console.log("get one");
        var j, isBind = false;
        for (j = 0; j < bindNum; j++) {
          var qaddr1 = await getBindingAddress_1(j).call();
          var qaddr2 = await getBindingAddress_2(j).call();
          if (addr1 == qaddr1 && addr2 == qaddr2) {
            isBind = true; break;
          }
        }
        if (isBind) {
          state = await getUserInfo(addr1).call();
          relationship = await getBindingRelationship(j).call();
          is_ignore = await getBindingIgnored(j).call();
          console.log(addr1);
          console.log(state);
          var a;
          if (state) a = "Alive";
          else a = "Dead";
          if(!is_ignore)
          {var x = "<tr>" + "<td>" + AllocID + "</td>" + "<td>" + addr1 + "</td>" + "<td>" + relationship + "</td>" + "<td>" + a + "</td>" + "</tr>";
          element.innerHTML = element.innerHTML + x;}
        } else {
          alert("no Binding");
        }
      }
    }
  },
  /**
   * 老东西爆金币力  
   * 需要返回到终端显示信息
   */
  GetMyInher:async function(){
    const {getInheritanceCount} = this.auction.methods;
    const {getInheritanceData} = this.auction.methods;
    const {getInheritanceID} = this.auction.methods;
    const {getUserInfo} = this.auction.methods;
    const {getInheritanceAddress_1} = this.auction.methods;
    const {getInheritanceAddress_2} = this.auction.methods;
    var i,qAllocID,data,x,is_find = false;
    var AllocID = document.getElementById("ID").value;
    const element = document.getElementById("data");
    var allocNum = await getInheritanceCount().call();
    console.log(AllocID);
    for(i=0;i<allocNum;i++){
      qAllocID = await getInheritanceID(i).call();
      if(qAllocID == AllocID){
        data = await getInheritanceData(i).call();
        is_find = true;
        break;
      }
    }

    var address1 = await getInheritanceAddress_1( i==allocNum?i-1:i  ).call();
    var address2 = await getInheritanceAddress_2( i==allocNum?i-1:i  ).call();
    var state = await getUserInfo(address1).call();
    console.log(is_find);
    var is_me = false;
    if(address2 == this.account){
      is_me = true;
    }

    
    if(!is_find){
      alert("未找到遗产信息！");
    }
    else if(!is_me){
      alert("不是你的遗产！");
    }
    else if(state){
      alert("暂时无法继承！");
    }
    else{
      var x = data;
      element.innerHTML = "\0";
      element.innerHTML += x;

      alert("成功查询！");
    }
  },

  ShowAddr: async function () {
    var num = this.Accounts.length;
    const element = document.getElementById("addrpubkey");
    //this.PubKey[this.index]  this.account
    var x = "<strong>My Address：" + this.account + "<br>" + "My PubKey：" + this.PubKey[this.index].slice(0,45) +'...'+ "</strong><br>";
    element.innerHTML = '\0';
    element.innerHTML += x;
  },

  Intro: async function () {
    const { addAc } = this.auction.methods;
    await addAc(this.account, this.index).send({ from: this.account });
    window.location.href = "index.html";
  },

  User: async function () {
    const { addAc } = this.auction.methods;
    await addAc(this.account, this.index).send({ from: this.account });
    window.location.href = "UserAgreement.html";
  },


  Account: async function () {
    const { addAc } = this.auction.methods;
    await addAc(this.account, this.index).send({ from: this.account });
    window.location.href = "myaccount.html";
  },

  Designate: async function () {
    const { addAc } = this.auction.methods;
    await addAc(this.account, this.index).send({ from: this.account });
    window.location.href = "my_inher.html";
  },

  Carry: async function () {
    const { addAc } = this.auction.methods;
    await addAc(this.account, this.index).send({ from: this.account });
    window.location.href = "carry_inher.html";
  },

  pingbi:async function () {
    const {getBindingCount} = this.auction.methods;
    const {getBindingAddress_1} = this.auction.methods;
    const {getBindingAddress_2} = this.auction.methods;
    const {getBindingIgnored} = this.auction.methods;
    const {setBindingIgnored} = this.auction.methods;
    
    const transactionObject = {
      from: this.Accounts[0],
      to: this.Accounts[1],
      gas: 6000000  // 适当设置足够的 gas 限制
      // 其他参数...
    };

    var addr1 = document.getElementById("pingbi").value;
    var i,is_bind = false;
    var bindNum = await getBindingCount().call();
    for(i=0;i<bindNum;i++){
      var qaddr1 = await getBindingAddress_1(i).call();
      var qaddr2 = await getBindingAddress_2(i).call();
      if(qaddr1 == addr1 && qaddr2==this.account){
        is_bind = true;
        break;
      }
    }

    if(!is_bind){
      alert("对方并未绑定你，无需屏蔽！");
    }
    else{
      await setBindingIgnored(i,true).send(transactionObject);
      this.CheckMyInher();
      alert("屏蔽成功！");
    }


  },
}

window.App = App;

window.addEventListener("load", function () {
  console.log("load+++++");
  console.log("now is start");
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
