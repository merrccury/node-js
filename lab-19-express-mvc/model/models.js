const { Sequelize, Model, DataTypes } = require('sequelize');

class Categories extends Model {
}
class Products extends Model {
}
class Position extends Model {
}
class Employees extends Model {
}
class Sales extends Model {
}
class Supplier extends Model {
}
class Stores extends Model {
}
class Supplies extends Model {
}

let initORM = (sequelize) => {
    Position.init({
        ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        POSITION: {type: DataTypes.STRING, allowNull: false}
    }, {
        sequelize,
        modelName: 'Position',
        tableName: 'POSITION',
        timestamps: false
    });
    Employees.init({
        ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        FIRST_NAME: {type: DataTypes.STRING, allowNull: false},
        LAST_NAME: {type: DataTypes.STRING, allowNull: false},
        DATE_OF_EMPLOYMENT: {type: DataTypes.DATE, allowNull: false},
        DATE_OF_EXIT: {type: DataTypes.DATE, allowNull: false},

    }, {
        sequelize,
        modelName: 'Employees',
        tableName: 'EMPLOYEES',
        timestamps: false
    })
    Categories.init({
        ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        CATEGORY: {type: DataTypes.STRING, allowNull: false},
        PARENT_CATEGORY: {type: DataTypes.INTEGER, allowNull: false, references: {model: Categories, key: "ID"}}
    }, {
        sequelize,
        modelName: 'Categories',
        tableName: 'CATEGORIES',
        timestamps: false
    });
    Products.init({
        ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        NAME: {type: DataTypes.STRING, allowNull: false},
        DESCRIPTION: {type: DataTypes.STRING, allowNull: false},
        DATE_OF_MANUFACTURE: {type: DataTypes.DATE, allowNull: false},
        STATUS: {type: DataTypes.BOOLEAN, allowNull: false},
        AVAILABLE: {type: DataTypes.INTEGER, allowNull: false},
        IN_STOCK: {type: DataTypes.INTEGER, allowNull: false},
        CATEGORY_ID: {type: DataTypes.INTEGER, allowNull: false, references: {model: Categories, key: "ID"}},
        PRICE: {type: DataTypes.DOUBLE, allowNull: false}
    }, {
        sequelize,
        modelName: 'Products',
        tableName: 'PRODUCTS',
        timestamps: false
    });
    Sales.init({
        ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        DATE_OF_PURCHASE: {type: Sequelize.DATE, allowNull: false},
        QUANTITY: {type: Sequelize.INTEGER, allowNull: false},
        SELLER: {type: Sequelize.INTEGER, allowNull: false, references: {model: Employees, key: "ID"}},
        PRODUCT: {type: Sequelize.INTEGER, allowNull: false, references: {model: Products, key: "ID"}},
    }, {
        sequelize,
        modelName: 'Products',
        tableName: 'PRODUCTS',
        timestamps: false
    })
    Stores.init({
        ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        ADDRESS: {type: Sequelize.STRING, allowNull: false},
        MANAGER: {type: Sequelize.INTEGER, allowNull: false, references: {model: Employees, key: "ID"}},
    }, {
        sequelize,
        modelName: 'Stores',
        tableName: 'STORES',
        timestamps: false
    });
    Supplier.init({
        ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        ORGANIZATION: {type: Sequelize.STRING, allowNull: false},
        ADDRESS: {type: Sequelize.STRING, allowNull: false},
        PHONE: {type: Sequelize.STRING, allowNull: false},
        EMAIL: {type: Sequelize.STRING, allowNull: false},
        COOPERATION: {type: Sequelize.BOOLEAN, allowNull: false}
    }, {
        sequelize,
        modelName: 'Supplier',
        tableName: 'SUPPLIER',
        timestamps: false
    });
    Supplies.init({
            ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            PRODUCT_ID: {type: Sequelize.INTEGER, allowNull: false, references: {model: Products, key: "ID"}},
            SUPPLIER_ID: {type: Sequelize.INTEGER, allowNull: false, references: {model: Supplier, key: "ID"}},
            STORE_ID: {type: Sequelize.INTEGER, allowNull: false, references: {model: Stores, key: "ID"}},
            DATE_OF_DELIVERY: {type: Sequelize.DATE, allowNull: false},
            QUANTITY: {type: Sequelize.INTEGER, allowNull: false},
            PURCHASE_PRICE: {type: Sequelize.DECIMAL, allowNull: false}
        }, {
            sequelize,
            modelName: 'Supplies',
            tableName: 'SUPPLIES',
            timestamps: false
        }
    );
    return {
        Categories, Products, Position,
        Employees, Sales, Supplier,
        Stores, Supplies
    };
}

exports.ORM = (s) => initORM(s);
