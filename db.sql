create table "user"
(
	id serial not null
		constraint user_pk
			primary key,
	name varchar(50),
	email varchar(50) not null,
	password text,
	position varchar(50),
	department varchar(50),
	address varchar(100),
	day_of_birth date
);
alter table "user"
	add token varchar(20);
