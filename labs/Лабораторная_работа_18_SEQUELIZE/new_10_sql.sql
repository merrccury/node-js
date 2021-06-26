
create table FACULTY
(    FACULTY      char(10) primary key,
     FACULTY_NAME  varchar(50) default '???'
);

insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  
			('����',	'���������� ���������� � �������'),
			('���',     '����������������� ���������'),
			('���',		'���������-������������� ���������'),
			('����',	'���������� � ������� ������ ��������������'),
			('���',		'���������� ������������ �������'),
            ('��',		'��������� �������������� ����������'); 

create table  PULPIT 
(   PULPIT		 char(20)  constraint PULPIT_PK  primary key,
    PULPIT_NAME  varchar(100), 
    FACULTY		 char(10)   constraint PULPIT_FACULTY_FK foreign key references FACULTY(FACULTY) 
);

insert into PULPIT   (PULPIT, PULPIT_NAME, FACULTY )
  values	('����', '�������������� ������ � ���������� ','��'  ),
			('������','���������������� ������������ � ������ ��������� ��-�������� ', '���'  ),
			('��', '����������� ���������','���'  ),
			('���', '�����������-������������ ���������', '���'  ),            
			('��', '��������������� �����������','���'  ),                              
			('��', '�����������','���'),          
			('��', '��������������','���'),           
			('�����', '���������� � ����������������','���'),                
			('����', '������ ������� � ������������','���'), 
			('���', '������� � ������������������','���'),              
			('������','������������ �������������� � ������-��������� �����-��������','���'),          
			('��', '���������� ����', '����'),                          
			('�����','������ ����� � ���������� �������������','����'),  
			('���','���������� �������������������� �����������', '����'),   
			('�����','���������� � ������� ������� �� ���������','����'),    
			('��', '������������ �����','���'), 
			('���','���������� ����������� ���������','���'),             
			('�������','���������� �������������� ������� � ����� ���������� ���������� ','����'), 
			('�����','��������� � ��������� ���������� �����������','����'),                                               
			('����',    '������������� ������ � ����������','���'),   
			('����',   '����������� � ��������� ������������������','���'),   
			('������', '����������, �������������� �����, ������� � ������', '���')     

create table TEACHER
(   
	TEACHER    char(10)  constraint TEACHER_PK  primary key,
	TEACHER_NAME  varchar(100), 
	GENDER     char(1) CHECK (GENDER in ('�', '�')),
	PULPIT   char(20) constraint TEACHER_PULPIT_FK foreign key references PULPIT(PULPIT) 
);

insert into  TEACHER    (TEACHER,   TEACHER_NAME, GENDER, PULPIT )
	values	('����',    '������ �������� �������������', '�',  '����'),
			('�����',    '�������� ��������� ��������', '�', '����'),
			('�����',    '���������� ������� ����������', '�', '����'),
			('�����',    '�������� ������ ��������', '�', '����'),
			('���',     '����� ��������� ����������', '�', '����'),
			('���',     '��������� ����� ��������', '�', '����'),
			('���',     '����� ������� ��������', '�', '����'),
			('���',     '����� ������� �������������',  '�', '����'),
			('���',     '����� ����� �������������',  '�',   '����'),
			('������',   '���������� ��������� �������������', '�','������'),
			('���',     '��������� ������� �����������', '�', '������'),
			('������',   '����������� ��������� ��������', '�', '����'),
			('����',   '������� ��������� ����������', '�', '����'),
			('����',   '������ ������ ��������', '�', '��'),
			('����', '������� ������ ����������',  '�',  '������'),
			('���',     '���������� ������� ��������', '�', '������'),
			('���',   '������ ������ ���������� ', '�', '��'),
			('�����',   '��������� �������� ���������', '�', '�����'),
			('������',   '���������� �������� ����������', '�', '��'),
			('�����',   '�������� ������ ����������', '�', '��'); 

create table SUBJECT
(    
	SUBJECT  char(10) constraint SUBJECT_PK  primary key, 
	SUBJECT_NAME varchar(100) unique,
	PULPIT  char(20) constraint SUBJECT_PULPIT_FK foreign key references PULPIT(PULPIT)   
);

 insert into SUBJECT   (SUBJECT,   SUBJECT_NAME, PULPIT )
	values ('����',   '������� ���������� ������ ������', '����'),
			('��',     '���� ������','����'),
			('���',    '�������������� ����������','����'),
			('����',  '������ �������������� � ����������������', '����'),
			('��',     '������������� ������ � ������������ ��������', '����'),
			('���',    '���������������� ������� ����������', '����'),
			('����',  '������������� ������ ��������� ����������', '����'),
			('���',     '�������������� �������������� ������', '����'),
			('��',      '������������ ��������� ','����'),
			('�����',   '��������. ������, �������� � �������� �����', '������'),
			('���',     '������������ �������������� �������', '����'),
			('���',     '����������� ��������. ������������', '������'),
			('��',   '���������� ����������', '����'),
			('��',   '�������������� ����������������','����'),
			('����', '���������� ������ ���',  '����'),
			('���',  '��������-��������������� ����������������', '����'),
			('��', '��������� ������������������','����'),
			('��', '������������� ������','����'),
			('������OO','�������� ������ ������ � ���� � ���. ������.','��'),
			('�������','������ ������-��������� � ������������� �����-����',  '������'),
			('��', '���������� �������� ','��'),
			('��',    '�����������', '�����'),
			('��',    '������������ �����', '��'),
			('���',    '���������� ��������� �������','�����'),
			('���',    '������ ��������� ����','��'),
			('����',   '���������� � ������������ �������������', '�����')

create table AUDITORIUM_TYPE
(
    AUDITORIUM_TYPE  char(10) constraint AUDITORIUM_TYPE_PK  primary key,
    AUDITORIUM_TYPENAME  varchar(30)
 )
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )        values ('��',            '����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )         values ('��-�',          '������������ �����');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )         values ('��-�',          '���������� � ���. ����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,  AUDITORIUM_TYPENAME )          values  ('��-X',          '���������� �����������');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME )        values  ('��-��',   '����. ������������ �����');

create table AUDITORIUM
(   AUDITORIUM   char(20)  constraint AUDITORIUM_PK  primary key,
    AUDITORIUM_TYPE     char(10) constraint  AUDITORIUM_AUDITORIUM_TYPE_FK foreign key
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE),
   AUDITORIUM_CAPACITY  integer constraint  AUDITORIUM_CAPACITY_CHECK default 1  check (AUDITORIUM_CAPACITY between 1 and 300),  -- �����������
   AUDITORIUM_NAME      varchar(50)
);

insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('206-1', '206-1',   '��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('301-1',   '301-1', '��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('236-1',   '236-1', '��',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('313-1',   '313-1', '��-�',   60);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('324-1',   '324-1', '��-�',   50);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('413-1',   '413-1', '��-�', 15);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('423-1',   '423-1', '��-�', 90);
insert into  AUDITORIUM   (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY) values  ('408-2',   '408-2', '��',  90);
