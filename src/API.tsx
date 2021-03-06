import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from 'axios';

/* コンテキスト */
import { AuthContext } from "./auth/AuthProvider";
import { EventContext, IEventContext } from "./auth/EventProvider";

/* firebase認証 */
import { app } from './base';
/* 設定ファイル */
import APIURL from './Config'

/* RegisterUser */
/* サインインの際に叩くAPI */
/* ここで初期化しておかないとDB処理でエラー
NextEventIDの部分*/
export const RegisterUser = (UID:string,email :string) => {
    console.log("Register!!")
    axios({
        method: 'post',
        url: APIURL + '/registerUser',
        headers: {
            'Content-Type': "application/json"
        },
        data: {
            UID: UID ,
            Email: email
        }
    }).then(res => {
    }).catch(error => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
}

export const GetEvents =  (): Promise<any> => {
    let res: any
    /* reject処理未実装 */
    return new Promise(resolve => {
        app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        res = await axios({
            method: 'get',
            url: APIURL + '/getEventsByUID',
            headers: {
                'Content-Type': "application/json",
                'Authorization': idToken
            },
        });
        resolve(res)
        }).catch((error: any) => {
            alert(error)
        });

    })
}
/* Event削除 API */
/* UID と　EventIDに基づいて削除 */
/* UIDはjwt */
/* res未実装 */
export const DeleteEvent = (eventID: number) => {
    console.log("DeleteEvent!!")
    app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        axios({
            method: 'post',
            url: APIURL + '/deleteEvent',
            headers: {
                'Content-Type': "application/json",
                'Authorization': idToken
            },
            data: {
                EventID: String(eventID)
            }
        }).then(res => {
            // console.log(res.data.NextEventID)
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
    }).catch((error: any) => {
        alert(error)
    });
}
export const GetNextEventID =  ():any => {
    console.log("GetNextEventID!!")
    // let resEventIDxxx:number =999
     app.auth().currentUser?.getIdToken(true).then((idToken: any) => {
        axios({
            method: 'post',
            url: APIURL + '/getNextEventID',
            headers: {
                'Content-Type': "application/json",
                 'Authorization': idToken
            }
        }).then(res => {
            console.log(res.data.NextEventID)
            return res.data.NextEventID
            // resEventIDxxx = res.data.NextEventID
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            return 1111
        });
    }).catch((error: any) => {
        alert(error)
    });
    return 0


}
export const AddEvent = (_nextEventID: number, date: string | undefined, input: string | null) => { 
    console.log("AddEvent!!")
     if (input == "" || input == null) {
     } else {
        app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        const res = await axios({
            method: 'post',
            url: APIURL + '/addEvent',
            headers: {
                'Content-Type': "application/json",
                'Authorization': idToken
            },
            data: {
                EventID: _nextEventID,
                Date: date,
                InputEvent: input
            }
        });
    }).catch((error: any) => {
        alert(error)
    });
    }
}
/* Event編集 API */
/* UID と　EventIDに基づいて編集 */
/* UIDはjwt */
/* res未実装 */
export const EditEvent = (EventID: number, InputEvent: string, BackgroundColor: string, BorderColor: string, TextColor:string) => {
    console.log("EditEvent!!")
    app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        const res = await axios({
            method: 'post',
            url: APIURL + '/editEvent',
            headers: {
                'Content-Type': "application/json",
                'Authorization': idToken
            },
            data: {
                EventID: String(EventID),
                InputEvent: InputEvent,
                BackgroundColor: BackgroundColor,
                BorderColor: BorderColor,
                TextColor: TextColor
            }
        });
    }).catch((error: any) => {
        alert(error)
    });
}

/* Todo追加 API */
/* UID */
/* UIDはjwt */
/* res未実装 */
export const AddTodo = (todoID: number | undefined,todo: string) => {
    console.log("API:AddTodo!!")
        app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
            const res = await axios({
                method: 'post',
                url: APIURL + '/addTodo',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': idToken
                },
                data: {
                    TodoID: String(todoID),
                    Todo: todo,
                }
            });
        }).catch((error: any) => {
            alert(error)
    });
}
/* Todo読み込み API */
/* UID */
/* UIDはjwt */
export const GetTodos = (): Promise<any> => {
    let res: any
    /* reject処理未実装 */
    return new Promise(resolve => {
        app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
            res = await axios({
                method: 'get',
                url: APIURL + '/getTodosByUID',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': idToken
                },
            });
            resolve(res)
        }).catch((error: any) => {
            alert(error)
        });

    })
}
/* Todo削除 API */
/* UID */
/* UIDはjwt */
/* res未実装 */
export const DeleteTodo = (todoID: number | undefined) => {
    console.log("API:DeleteTodo!!")
    app.auth().currentUser?.getIdToken(true).then(async (idToken: any) => {
        const res = await axios({
            method: 'post',
            url: APIURL + '/deleteTodo',
            headers: {
                'Content-Type': "application/json",
                'Authorization': idToken
            },
            data: {
                TodoID: String(todoID),
            }
        });
    }).catch((error: any) => {
        alert(error)
    });
}