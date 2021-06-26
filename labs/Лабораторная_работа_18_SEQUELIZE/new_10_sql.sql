
create table FACULTY
(    FACULTY      char(10) primary key,
     FACULTY_NAME  varchar(50) default '???'
);

insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  
			('ХТиТ',	'Химическая технология и техника'),
			('ЛХФ',     'Лесохозяйственный факультет'),
			('ИЭФ',		'Инженерно-экономический факультет'),
			('ТТЛП',	'Технология и техника лесной промышленности'),
			('ТОВ',		'Технология органических веществ'),
            ('ИТ',		'Факультет информационных технологий'); 

create table  PULPIT 
(   PULPIT		 char(20)  constraint PULPIT_PK  primary key,
    PULPIT_NAME  varchar(100), 
    FACULTY		 char(10)   constraint PULPIT_FACULTY_FK foreign key references FACULTY(FACULTY) 
);

insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
  values	('ИСиТ', 'Информационных систем и технологий ','ИТ'  ),
			('ПОиСОИ','Полиграфического оборудования и систем обработки ин-формации ', 'ИЭФ'  ),
			('БФ', 'Белорусской филологии','ИЭФ'  ),
			('РИТ', 'Редакционно-издательских тенологий', 'ИЭФ'  ),            
			('ПП', 'Полиграфических производств','ИЭФ'  ),                              
			('ЛВ', 'Лесоводства','ЛХФ'),          
			('ЛУ', 'Лесоустройства','ЛХФ'),           
			('ЛЗиДВ', 'Лесозащиты и древесиноведения','ЛХФ'),                
			('ЛКиП', 'Лесных культур и почвоведения','ЛХФ'), 
			('ТиП', 'Туризма и природопользования','ЛХФ'),              
			('ЛПиСПС','Ландшафтного проектирования и садово-паркового строи-тельства','ЛХФ'),          
			('ТЛ', 'Транспорта леса', 'ТТЛП'),                          
			('ЛМиЛЗ','Лесных машин и технологии лесозаготовок','ТТЛП'),  
			('ТДП','Технологий деревообрабатывающих производств', 'ТТЛП'),   
			('ТиДИД','Технологии и дизайна изделий из древесины','ТТЛП'),    
			('ОХ', 'Органической химии','ТОВ'), 
			('ХПД','Химической переработки древесины','ТОВ'),             
			('ТНВиОХТ','Технологии неорганических веществ и общей химической технологии ','ХТиТ'), 
			('ПиАХП','Процессов и аппаратов химических производств','ХТиТ'),                                               
			('ЭТиМ',    'Экономической теории и маркетинга','ИЭФ'),   
			('МиЭП',   'Менеджмента и экономики природопользования','ИЭФ'),   
			('СБУАиА', 'Статистики, бухгалтерского учета, анализа и аудита', 'ИЭФ')     

create table TEACHER
(   
	TEACHER    char(10)  constraint TEACHER_PK  primary key,
	TEACHER_NAME  varchar(100), 
	GENDER     char(1) CHECK (GENDER in ('м', 'ж')),
	PULPIT   char(20) constraint TEACHER_PULPIT_FK foreign key references PULPIT(PULPIT) 
);

insert into  TEACHER    (TEACHER,   TEACHER_NAME, GENDER, PULPIT )
	values	('СМЛВ',    'Смелов Владимир Владиславович', 'м',  'ИСиТ'),
			('АКНВЧ',    'Акунович Станислав Иванович', 'м', 'ИСиТ'),
			('КЛСНВ',    'Колесников Виталий Леонидович', 'м', 'ИСиТ'),
			('БРКВЧ',    'Бракович Андрей Игоревич', 'м', 'ИСиТ'),
			('ДТК',     'Дятко Александр Аркадьевич', 'м', 'ИСиТ'),
			('УРБ',     'Урбанович Павел Павлович', 'м', 'ИСиТ'),
			('ГРН',     'Гурин Николай Иванович', 'м', 'ИСиТ'),
			('ЖЛК',     'Жиляк Надежда Александровна',  'ж', 'ИСиТ'),
			('МРЗ',     'Мороз Елена Станиславовна',  'ж',   'ИСиТ'),
			('БРТШВЧ',   'Барташевич Святослав Александрович', 'м','ПОиСОИ'),
			('АРС',     'Арсентьев Виталий Арсентьевич', 'м', 'ПОиСОИ'),
			('БРНВСК',   'Барановский Станислав Иванович', 'м', 'ЭТиМ'),
			('НВРВ',   'Неверов Александр Васильевич', 'м', 'МиЭП'),
			('РВКЧ',   'Ровкач Андрей Иванович', 'м', 'ЛВ'),
			('ДМДК', 'Демидко Марина Николаевна',  'ж',  'ЛПиСПС'),
			('БРГ',     'Бурганская Татьяна Минаевна', 'ж', 'ЛПиСПС'),
			('РЖК',   'Рожков Леонид Николаевич ', 'м', 'ЛВ'),
			('ЗВГЦВ',   'Звягинцев Вячеслав Борисович', 'м', 'ЛЗиДВ'),
			('БЗБРДВ',   'Безбородов Владимир Степанович', 'м', 'ОХ'),
			('НСКВЦ',   'Насковец Михаил Трофимович', 'м', 'ТЛ'); 

create table SUBJECT
(    
	SUBJECT  char(10) constraint SUBJECT_PK  primary key, 
	SUBJECT_NAME varchar(100) unique,
	PULPIT  char(20) constraint SUBJECT_PULPIT_FK foreign key references PULPIT(PULPIT)   
);

 insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
	values ('СУБД',   'Системы управления базами данных', 'ИСиТ'),
			('БД',     'Базы данных','ИСиТ'),
			('ИНФ',    'Информационные технологии','ИСиТ'),
			('ОАиП',  'Основы алгоритмизации и программирования', 'ИСиТ'),
			('ПЗ',     'Представление знаний в компьютерных системах', 'ИСиТ'),
			('ПСП',    'Программирование сетевых приложений', 'ИСиТ'),
			('МСОИ',  'Моделирование систем обработки информации', 'ИСиТ'),
			('ПИС',     'Проектирование информационных систем', 'ИСиТ'),
			('КГ',      'Компьютерная геометрия ','ИСиТ'),
			('ПМАПЛ',   'Полиграф. машины, автоматы и поточные линии', 'ПОиСОИ'),
			('КМС',     'Компьютерные мультимедийные системы', 'ИСиТ'),
			('ОПП',     'Организация полиграф. производства', 'ПОиСОИ'),
			('ДМ',   'Дискретная математика', 'ИСиТ'),
			('МП',   'Математическое программирование','ИСиТ'),
			('ЛЭВМ', 'Логические основы ЭВМ',  'ИСиТ'),
			('ООП',  'Объектно-ориентированное программирование', 'ИСиТ'),
			('ЭП', 'Экономика природопользования','МиЭП'),
			('ЭТ', 'Экономическая теория','ЭТиМ'),
			('БЛЗиПсOO','Биология лесных зверей и птиц с осн. охотов.','ЛВ'),
			('ОСПиЛПХ','Основы садово-паркового и лесопаркового хозяй-ства',  'ЛПиСПС'),
			('ИГ', 'Инженерная геодезия ','ЛВ'),
			('ЛВ',    'Лесоводство', 'ЛЗиДВ'),
			('ОХ',    'Органическая химия', 'ОХ'),
			('ТРИ',    'Технология резиновых изделий','ЛЗиДВ'),
			('ВТЛ',    'Водный транспорт леса','ТЛ'),
			('ТиОЛ',   'Технология и оборудование лесозаготовок', 'ЛЗиДВ')

create table AUDITORIUM_TYPE
(
    AUDITORIUM_TYPE  char(10) constraint AUDITORIUM_TYPE_PK  primary key,
    AUDITORIUM_TYPENAME  varchar(30)
 )
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )        values ('ЛК',            'Лекционная');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )         values ('ЛБ-К',          'Компьютерный класс');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )         values ('ЛК-К',          'Лекционная с уст. проектором');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )          values  ('ЛБ-X',          'Химическая лаборатория');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )        values  ('ЛБ-СК',   'Спец. компьютерный класс');

create table AUDITORIUM
(   AUDITORIUM   char(20)  constraint AUDITORIUM_PK  primary key,
    AUDITORIUM_TYPE     char(10) constraint  AUDITORIUM_AUDITORIUM_TYPE_FK foreign key
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE),
   AUDITORIUM_CAPACITY  integer constraint  AUDITORIUM_CAPACITY_CHECK default 1  check (AUDITORIUM_CAPACITY between 1 and 300),  -- вместимость
   AUDITORIUM_NAME      varchar(50)
);

insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('206-1', '206-1',   'ЛБ-К', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('301-1',   '301-1', 'ЛБ-К', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('236-1',   '236-1', 'ЛК',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('313-1',   '313-1', 'ЛК-К',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('324-1',   '324-1', 'ЛК-К',   50);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('413-1',   '413-1', 'ЛБ-К', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('423-1',   '423-1', 'ЛБ-К', 90);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('408-2',   '408-2', 'ЛК',  90);
