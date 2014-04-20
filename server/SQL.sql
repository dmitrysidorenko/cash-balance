/* SELECT * FROM category WHERE IsIncome=1 */
 /* SELECT * FROM balanceline WHERE DATE(Date) = DATE(NOW()); */
/*SELECT * FROM balanceline  WHERE DATA(Date)=date(NOW()) */
 /* SELECT * FROM Balanceline INNER JOIN Category ON balanceline.IdCategory=Category.ID WHERE Category.IsIncome=1*/
 /*SELECT * FROM balanceline
 INNER JOIN Category ON Balanceline.IdCategory=category.ID
 WHERE Category.IsIncome=0 AND DATE(balanceline.Date)=date(NOW())*/

/*SELECT * FROM balanceline INNER JOIN Category ON Balanceline.IdCategory=category.ID
 WHERE Category.IsIncome=0 AND Date >= '2014-04-11 00:00:00' AND  Date <= '2015-01-01 00:00:00';*/

  /*SELECT IdCategory FROM balanceline WHERE Date >= '2014-04-11 00:00:00' AND  Date <= '2015-01-01 00:00:00';*/
  /*INSERT INTO category(CategoryName,IsIncome)VALUES('',0);*/
  /*DELETE FROM category WHERE CategoryName="";*/
 /* INSERT INTO balanceline(IdCategory, Summ, Date) VALUES(1,1,"");*/




