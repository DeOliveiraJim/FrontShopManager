import { Product } from './product';
import { Shop } from './shop';

export class Util {
  static getAName(p: Product) {
    let x = p.details.findIndex((x) => x.lang == 'fr');
    if (x != -1) {
      return p.details[x].name;
    }
    x = p.details.findIndex((x) => x.lang == 'en');
    if (x != -1) {
      return p.details[x].name;
    }
    return p.details[0].name;
  }

  static formatOpeningTimes(s: Shop) {
    function formatForDay(d: number): string {
      let result = [];
      for (let ot of s.openingTimes) {
        if (!ot.days.includes(d)) continue;
        let oStart = ot.start.split(':').map((x) => parseInt(x));
        if (result.length == 0) result.push(ot);
        else {
          for (let i = 0; i < result.length + 1; i++) {
            if (i == result.length) {
              result.push(ot);
              break;
            }
            let rStart = result[i].start.split(':').map((x) => parseInt(x));
            if (
              oStart[0] < rStart[0] ||
              (oStart[0] == rStart[0] && oStart[1] < rStart[1])
            ) {
              result.splice(i, 0, ot);
              break;
            }
          }
        }
      }
      return result.map((x) => x.start + '-' + x.end).join(', ');
    }
    const days = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
    let dayIdx = 0;
    let prev = '';
    let result = [];
    let resultItem = '';
    for (let i = 0; i < 7; i++) {
      let res = formatForDay(i);
      if (prev != res && prev != '') {
        if (dayIdx == i - 1) {
          resultItem = days[dayIdx];
        } else {
          resultItem = days[dayIdx] + '-' + days[i - 1];
        }
        resultItem += ': ' + prev;
        result.push(resultItem);
        dayIdx = i;
      } else if (prev != res && prev == '') {
        dayIdx = i;
      }
      if (i == 6 && res != '') {
        if (dayIdx == i) {
          resultItem = days[dayIdx];
        } else {
          resultItem = days[dayIdx] + '-' + days[i];
        }
        resultItem += ': ' + res;
        result.push(resultItem);
      }
      prev = res;
    }
    return result;
  }
}
