npx sequelize-cli model:generate --name User --attributes document_type:integer,document_id:integer,first_name:text,last_name:text,gender:string,phone:string,birthday:date,user_type:integer,user_status:boolean
npx sequelize-cli model:generate --name Sale --attributes sale_date:date,sale_time:time,docId:integer,domicile_id:integer,sale_status:boolean
npx sequelize-cli model:generate --name Product --attributes pro_description:text,pro_image:string,price:integer,category_id:integer,discount_id:integer,pro_status:boolean,percentage_tax:double
npx sequelize-cli model:generate --name Payment --attributes pay_description:text,pay_date:date,pay_time:time,pay_status:boolean
npx sequelize-cli model:generate --name Domicile --attributes domicile_name:string,domicile_address:string,phone:string,attention_time:string,domicile_status:boolean
npx sequelize-cli model:generate --name Discount --attributes title:string,dis_description:text,ini_date:date,final_date:date,discount_status:boolean,dis_value:double
npx sequelize-cli model:generate --name Category --attributes cat_name:string,cat_description:text,cat_status:boolean
npx sequelize-cli model:generate --name Bank --attributes bank_name:string