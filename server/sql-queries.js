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
    "createBalanceLine": "INSERT INTO BalanceLine(Sum, Date, CategoryId, Note) VALUES({{sum}}, '{{date}}', {{categoryId}}, '{{note}}')",
    "createCategory": "",
    "removeBalanceLine": "",
    "removeCategory": "",
    "getAllBalanceLines": "SELECT * FROM BalanceLine",
    "getAllBalanceLinesWithCategories": "SELECT BalanceLine.*, Category.CategoryName, Category.IsIncome" +
        " FROM BalanceLine INNER JOIN" +
        " Category ON Category.ID = BalanceLine.CategoryId",
    "getAllBalanceLinesWithCategoriesAndFilterByGroup": "SELECT BalanceLine.*, Category.CategoryName, Category.IsIncome" +
        " FROM BalanceLine INNER JOIN" +
        " Category ON Category.ID = BalanceLine.CategoryId WHERE BalanceLine.CategoryId = {{categoryId}}",
    "getAllCategories": "SELECT * FROM Category"
};