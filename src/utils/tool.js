import moment from 'moment'

let tool = {
	getMomentDate (i, x) {
		// 1: 当前日期,格式：YYY-MM-DD;
		// 3：当前日期加一天,格式：YYY-MM-DD;
		// 4：当前月份,纯数字;
		// 5: 当前月份,YYYY-MM;
		// 6: 当前月份的上一个月,YYYY-MM;
		// 7: 当前月份的上三个月,YYYY-MM;
		// 8: 当前日期的近30天,YYYY-MM-DD;
		// 9: 当前日期的上一个月的月份，M;
		// 10:当前日期的上X个月的月份 参数x
		// 11:当前年,YYYY
		// 12:当前时分秒(当前暂没添加此功能)
		let currentDate = '';
		if (i === 1) {
			currentDate = moment().format('YYYY-MM-DD')
		} else if (i === 2) {
			// currentDate = year + '年' + month + '月' + strDate + '日';
		} else if (i === 3) {
			currentDate = moment().add(1, 'd').format('YYYY-MM-DD')
		} else if (i === 4) {
			currentDate = moment().format('M')
		} else if (i === 5) {
			currentDate = moment().format('YYYY-MM')
		} else if (i === 6) {
			currentDate = moment().subtract(1, 'M').format('YYYY-MM')
		} else if (i === 7) {
			currentDate = moment().subtract(3, 'M').format('YYYY-MM')
		} else if (i === 8) {
			currentDate = moment().subtract(30, 'd').format('YYYY-MM-DD')
		} else if (i === 9) {
			currentDate = moment().subtract(1, 'M').format('M')
		} else if (i === 10) {
			currentDate = moment().subtract(x, 'M').format('YYYY-MM')
		} else if (i === 11) {
			currentDate = moment().format('YYYY')
		}
		return currentDate;
	},
	//2020-01 ==> 1
	formatYYYYMM (date) {
		let array = date.split('-');
		let month = array[1];
		return Number(month)
	},
	//2020-01-01 ==> 1
	formatYYYYMMdd (date) {
		let array = date.split('-');
		let day = array[2];
		return Number(day)
	},
  //2020-01-01 ==> 1.1
  formatDay (date){
    let array = date.split('-');
    return Number(array[1]) + '.' + Number(array[2])
  },
	random (min, max, isZ = true) {
		if (isZ) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		} else {
			return Math.random() * (max - min + 1) + min;
		}
	},
	// 生成随机id
	randomId (num) {
		let returnStr = '';
		let	charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < num; i++) {
			if (i === 0) {
				returnStr += 'P';
				continue
			}
			let index = Math.round(Math.random() * (charStr.length - 1));
			returnStr += charStr.substring(index, index + 1);
		}
		return returnStr;
	},
	//颜色--16进制格式转rgba格式+指定透明度
	colorFormatConvert (str, opacity = 1) {
		if (str.includes('rgba')) {
			let colorTrans = str.split(')')[0].split(',')[3] = String(opacity)
			let color3 = str.split(')')[0].split(',')[0] + ',' + str.split(')')[0].split(',')[1] + ',' + str.split(')')[0].split(',')[2] + ',' + colorTrans + ')'
			return color3
		} else {
			var sColor = str.toLowerCase();
			if (sColor) {
				if (sColor.length === 4) {
					var sColorNew = "#";
					for (var i = 1; i < 4; i += 1) {
						sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
					}
					sColor = sColorNew;
				}
				//处理六位的颜色值
				var sColorChange = [];
				for (let i = 1; i < 7; i += 2) {
					sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
				}
				return "rgba(" + sColorChange.join(",") + "," + opacity + ")";
			} else {
				return sColor;
			}
		}
	}
};

export { tool }
