//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

import React, { useEffect, useState } from 'react';

import Lines from './../../component/Lines';
import { _getTenData, _getDaysData } from "../../util/req";
import dayjs from "dayjs";



function gettimes() {
    var arr = []
    for (let index = 0; index < 41; index++) {
        var hs = dayjs().subtract(15 * index, 'minute').format("YYYYMMDD-HHmm")
        arr.push(hs)
    }
    arr = arr.map(it => {
        var hs = it.slice(0, 11)
        var cum = it.slice(11, 13)
        var cm = Number(cum) - (Number(cum) % 15)
        return hs + (cm < 9 ? '0' + cm : cm)
    })
    return arr
}


const flatten = (arr, depth = 1) =>
    arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);

const groupBy = (arr, fn) =>
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i]);
        return acc;
    }, {});



function Index({ center, initLinekers }) {
    const [info, setInfo] = useState({
        labels: [],
        datas: [],
    });
    const [info7, setInfo7] = useState({
        labels: [],
        datas: [],
    });
    useEffect(() => {
        const getInfo = async () => {
            var res = await _getTenData()
            var data = fordata(res.data)
            var dayres = await _getDaysData()
            var daydata = fordata(dayres.data)
            setInfo(data)
            setInfo7(daydata)
        };
        getInfo();
    }, []);


    const fordata = (data) => {
        var labels = data.map(it => it.updateTime)
        var waitTimes = flatten(data.map(it => it.waitTime), 3)

        var dataObe = groupBy(waitTimes, 'hospName')
        var data = []
        for (const key in dataObe) {
            var obj = {}
            if (Object.hasOwnProperty.call(dataObe, key)) {
                const element = dataObe[key];
                obj.label = key
                obj.data = element.map(it => it.topWait)
                data.push(obj)
            }
        }
        data = data.map(it => ({ ...it, data: it.data.map(i => i.replace(/[^0-9]/ig, "")) }))
        return {
            labels,
            datas: data,
        }
    }

    return (
        <div className="info-center">
            <p>
                10hours
            </p>
            <Lines {...info} />
            <p>
                7days
            </p>
            <Lines {...info7} />

        </div>
    );
}

export default Index;
