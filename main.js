import * as fs from 'fs';
import { parse } from "node-html-parser";

fs.readFile('account.html', (err, data) => {
    if (data) {
        let runningTotal = 0;
        let spent = 0;
        let earned = 0;

        const root = parse(data.toString());
        const table = root.querySelector(`.wallet_history_table`);
        const tableData = table.querySelector('tbody').querySelectorAll('tr');
        for (const row of tableData) {
            const total = row.querySelector('.wht_total');
            if (total?.text) {
                const value = total.text.trim();

                const isAdd = value.toLowerCase().indexOf('credit') === -1;
                const money = Number(value.replaceAll(/[^\d.]/g, ''));
                if (isAdd) {
                    runningTotal += money
                    spent += money;
                } else {
                    runningTotal -= money;
                    earned += money;
                }
            }
        }
        console.info(`Total Spent: $${spent.toFixed(2)} | Total Earned: $${earned.toFixed(2)} | Net Total: $${runningTotal.toFixed(2)}`);
    }
});
