npx sequelize-cli model:generate --name User --attributes document_type:integer,document_id:integer,first_name:text,last_name:text,gender:string,phone:string,birthday:date,user_type:integer,user_status:boolean
npx sequelize-cli model:generate --name Sale --attributes sale_date:date,sale_time:time,docId:integer,domicile_id:integer,sale_status:boolean
npx sequelize-cli model:generate --name Product --attributes pro_description:text,pro_image:string,price:integer,category_id:integer,discount_id:integer,pro_status:boolean,percentage_tax:double
npx sequelize-cli model:generate --name Payment --attributes pay_description:text,pay_date:date,pay_time:time,pay_type:string,amount:integer,card_number:string,pay_status:boolean
npx sequelize-cli model:generate --name Domicile --attributes domicile_name:string,domicile_address:string,phone:string,attention_time:string,domicile_status:boolean
npx sequelize-cli model:generate --name Discount --attributes title:string,dis_description:text,ini_date:date,final_date:date,discount_status:boolean,dis_value:double
npx sequelize-cli model:generate --name Category --attributes cat_name:string,cat_description:text,cat_status:boolean
npx sequelize-cli model:generate --name Bank --attributes bank_name:string
npx sequelize-cli model:generate --name Debit --attributes debit_number:string,debit_type:string,bank:integer
npx sequelize-cli model:generate --name Credit --attributes credit_number:string,approval_number:integer,bank:integer,fees_number:integer,amount:integer
npx sequelize-cli model:generate --name Restaurant --attributes restaurant_name:string,restaurant_address:string,phone:string,attention_time:string,restaurant_status:boolean
npx sequelize-cli model:generate --name Ingredient --attributes ingredient_name:string,price:integer
npx sequelize-cli model:generate --name IngredientItem --attributes ingredient_id:integer,product_id:integer,amount:integer
npx sequelize-cli model:generate --name Promo --attributes ini_date:date,final_date:date,promo_name:string,promo_description:text
npx sequelize-cli model:generate --name PromoItem --attributes promo_id:integer,product_id:integer,amount:integer
npx sequelize-cli model:generate --name SaleItem --attributes sale_id:integer,amount:integer,totalIva:integer,subtotal:integer,item_total:integer,total_discount:integer,product_id:integer
npx sequelize-cli model:generate --name Bill --attributes nit:integer,sale_id:integer,payment_id:integer,bill_time:time,bill_date:date,subtotal:double,totalIva:double,total_discount:double,total_payment:double,bill_status:boolean

#Crear bd
npx sequelize-cli db:create

#Crear modelos
npx sequelize-cli model:generate --name Bank --attributes bank_name:string

#Migrar
npx sequelize-cli db:migrate

#Crear seeders
npx sequelize-cli seed:generate --name users_seed
npx sequelize-cli seed:generate --name banks_seed
npx sequelize-cli seed:generate --name bills_seed
npx sequelize-cli seed:generate --name credits_seed
npx sequelize-cli seed:generate --name debits_seed
npx sequelize-cli seed:generate --name discounts_seed
npx sequelize-cli seed:generate --name ingredients_seed
npx sequelize-cli seed:generate --name ingredientitems_seed
npx sequelize-cli seed:generate --name payments_seed
npx sequelize-cli seed:generate --name restaurants_seed
npx sequelize-cli seed:generate --name sales_seed
npx sequelize-cli seed:generate --name saleitems_seed
npx sequelize-cli seed:generate --name promos_seed
npx sequelize-cli seed:generate --name promoitems_seed
npx sequelize-cli seed:generate --name products_seed

#Migrar las semillas
npx sequelize-cli db:seed:all

#Deshacer los cambios de semillas
npx sequelize-cli db:seed:undo:all

#Cambios
npx sequelize-cli db:migrate:undo:all and npx sequelize-cli db:migrate