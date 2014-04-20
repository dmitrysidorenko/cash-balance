/**
 * Created by Dmitriy on 21.04.14.
 */

/**
 * Use following syntax to define customized params in query:
 * "SELECT * FROM BalanceLine WHERE Date >= {{date}}"
 * Custom param should be unique for query
 * @type {{createBalanceLine: string, createCategory: string, removeBalanceLine: string, removeCategory: string}}
 */
module.exports = {
    "createBalanceLine": "INSERT INTO BalanceLine(Summ, Date, CategoryId, Note) VALUES({{summ}}, {{date}}, {{categoryId}}, {{note}})",
    "createCategory": "",
    "removeBalanceLine": "",
    "removeCategory": "",
    "getAllBalanceLines": "SELECT * FROM BalanceLine"
};