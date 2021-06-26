const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Faculty extends Model {
}

class Pulpit extends Model {
}

class Teacher extends Model {
}

class Subject extends Model  {
}

class AuditoriumType extends Model {
}

class Auditorium extends Model {
}


let initORM = (sequelize) => {
    Faculty.init({
        FACULTY: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        FACULTY_NAME: {type: Sequelize.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'Faculty',
        tableName: 'FACULTY',
        timestamps: false,
        hooks:{
            beforeCreate: (attributes, options) => console.log('beforeCreate -> FACULTY'),
            afterCreate: (attributes, options) => console.log('afterCreate -> FACULTY')
        }
    })
    Pulpit.init({
        PULPIT: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        PULPIT_NAME: {type: Sequelize.STRING, allowNull: false},
        FACULTY: {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Faculty, key: "FACULTY"}
        }
    }, {
        sequelize,
        modelName: 'Pulpit',
        tableName: 'PULPIT',
        timestamps: false
    })
    Teacher.init({
        TEACHER: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        TEACHER_NAME: {type: Sequelize.STRING, allowNull: false},
        PULPIT: {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Pulpit, key: "PULPIT"}
        }
    }, {
        sequelize,
        modelName: 'Teacher',
        tableName: 'TEACHER',
        timestamps: false
    })
    Subject.init({
        SUBJECT: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        SUBJECT_NAME: {type: Sequelize.STRING, allowNull: false},
        PULPIT: {
            type: Sequelize.STRING, allowNull: false,
            references: {model: Pulpit, key: "PULPIT"}
        }
    }, {
        sequelize,
        modelName: 'Subject',
        tableName: 'SUBJECT',
        timestamps: false
    })
    AuditoriumType.init({
        AUDITORIUM_TYPE: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        AUDITORIUM_TYPENAME: {type: Sequelize.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'AuditoriumType',
        tableName: 'AUDITORIUM_TYPE',
        timestamps: false
    })
    Auditorium.init({
        AUDITORIUM: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        AUDITORIUM_CAPACITY: {type: Sequelize.INTEGER, allowNull: false},
        AUDITORIUM_NAME: {type: Sequelize.STRING, allowNull: false},
        AUDITORIUM_TYPE: {
            type: Sequelize.STRING, allowNull: false,
            references: {model: AuditoriumType, key: "AUDITORIUM_TYPE"}
        }
    }, {
        sequelize,
        modelName: 'Auditorium',
        tableName: 'AUDITORIUM',
        timestamps: false,
        scopes:{
            auditoriumsgt60:{
                where:{
                    AUDITORIUM_CAPACITY:{
                        [Sequelize.Op.gt]:60
                    }
                }
            }
        }
    });

    Faculty.hasMany(Pulpit, {as: "faculty_pulpits", foreignKey: "FACULTY", sourceKey: "FACULTY"});
    Pulpit.hasMany(Teacher, {as: "pulpit_teachers", foreignKey: "PULPIT", sourceKey: "PULPIT"});


    return {Faculty, Pulpit, Teacher, Subject, AuditoriumType, Auditorium};
}
exports.ORM = (s) => initORM(s);
