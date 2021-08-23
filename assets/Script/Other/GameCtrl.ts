
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Camp } from "./GameData";
import SoldiersParent from "./SoldiersParent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl {
    private static _instance: GameCtrl = null;

    private _allEnemyList: SoldiersParent[] = [];
    private _allPlayerList: SoldiersParent[] = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    public static getInstance() {
        if (!this._instance) {
            this._instance = new GameCtrl();
            this._instance._init();
        }
        return this._instance;
    }

    private _init() {

    }

    addEnemy(sold: SoldiersParent) {
        this._allEnemyList.push(sold);
    }

    addPlayer(sold: SoldiersParent) {
        this._allPlayerList.push(sold);
    }

    dieEnemy(sold: SoldiersParent) {
        for (let index = 0; index < this._allEnemyList.length; index++) {
            if (this._allEnemyList[index] == sold) {
                this._allEnemyList.splice(index, 1)
                return
            }
        }
    }

    diePlayer(sold: SoldiersParent) {
        for (let index = 0; index < this._allPlayerList.length; index++) {
            if (this._allPlayerList[index] == sold) {
                this._allPlayerList.splice(index, 1)
                return
            }
        }
    }

    getSold(sold: SoldiersParent, _camp: Camp): SoldiersParent {
        if (_camp == Camp.bule) {
            return this.getEnemy(sold)
        } else {
            return this.getPlayer(sold)
        }
    }

    getRandSold(sold: SoldiersParent, _camp: Camp): SoldiersParent[] {
        if (_camp == Camp.bule) {
            return this.getAllEnemy(sold)
        } else {
            return this.getAllPlayer(sold)
        }
    }

    getEnemy(sold: SoldiersParent): SoldiersParent {
        let enemy: SoldiersParent = null;
        if (!sold) return enemy
        let playerNodeX = sold.node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
        for (let index = 0; index < this._allEnemyList.length; index++) {
            if (this._allEnemyList[index].node) {
                let enemyNodeX = this._allEnemyList[index].node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
                if (Math.abs(playerNodeX - enemyNodeX) <= sold.soldierData.attackRange) {
                    if (enemy) {
                        if (Math.abs(playerNodeX - enemyNodeX) < Math.abs(playerNodeX - enemy.node.x)) {
                            enemy = this._allEnemyList[index];
                        }
                    } else {
                        enemy = this._allEnemyList[index];
                    }
                }
            }
        }
        return enemy
    }

    getPlayer(sold: SoldiersParent): SoldiersParent {
        let player: SoldiersParent = null;
        if (!sold) return player
        let enemyNodeX = sold.node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
        for (let index = 0; index < this._allPlayerList.length; index++) {
            if (this._allPlayerList[index].node) {
                let playerNodeX = this._allPlayerList[index].node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
                if (Math.abs(enemyNodeX - playerNodeX) <= sold.soldierData.attackRange) {
                    if (player) {
                        if (Math.abs(enemyNodeX - playerNodeX) < Math.abs(enemyNodeX - player.node.x)) {
                            player = this._allPlayerList[index];
                        }
                    } else {
                        player = this._allPlayerList[index];
                    }
                }
            }
        }
        return player
    }

    getAllEnemy(sold: SoldiersParent): SoldiersParent[] {
        let enemyList: SoldiersParent[] = [];
        if (!sold) return enemyList
        let playerNodeX = sold.node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
        for (let index = 0; index < this._allEnemyList.length; index++) {
            if (this._allEnemyList[index].node) {
                let enemyNodeX = this._allEnemyList[index].node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
                if (Math.abs(playerNodeX - enemyNodeX) <= sold.soldierData.skillRange) {
                    enemyList.push(this._allEnemyList[index])
                }
            }
        }
        enemyList.sort((a,b)=>{
            return a.node.x - b.node.x
        })
        return enemyList
    }

    getAllPlayer(sold: SoldiersParent): SoldiersParent[] {
        let playerList: SoldiersParent[] = [];
        if (!sold) return playerList
        let playerNodeX = sold.node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
        for (let index = 0; index < this._allEnemyList.length; index++) {
            if (this._allEnemyList[index].node) {
                let enemyNodeX = this._allEnemyList[index].node.convertToWorldSpaceAR(cc.v2(0, 0)).x;
                if (Math.abs(playerNodeX - enemyNodeX) <= sold.soldierData.skillRange) {
                    playerList.push(this._allEnemyList[index])
                }
            }
        }
        playerList.sort((a,b)=>{
            return a.node.x - b.node.x
        })
        return playerList
    }
    // update (dt) {}
}
