'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    console.log('Seeding initial data...');
    // Insertar categorías
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Electrónica' },
      { id: 2, name: 'Ropa' },
      { id: 3, name: 'Hogar' },
    ], {});

    // Insertar productos de ejemplo
    await queryInterface.bulkInsert('products', [
      {
        title: 'Smartphone',
        description: 'Un smartphone de última generación',
        category_id: 1,
        price: 500.00,
        discount_percentage: 5.00,
        rating: 4.7,
        stock: 100,
        tags: Sequelize.literal("ARRAY['nuevo','tecnología']"),
        brand: 'TechBrand',
        sku: 'TB123',
        weight: 200,
        warranty_information: '1 año de garantía',
        shipping_information: 'Envío gratis',
        availability_status: 'in_stock',
        return_policy: '30 días para devoluciones',
        minimum_order_quantity: 1,
        thumbnail: 'http://url.com/smartphone.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Camiseta',
        description: 'Camiseta 100% algodón',
        category_id: 2,
        price: 20.00,
        discount_percentage: 10.00,
        rating: 4.2,
        stock: 200,
        tags: Sequelize.literal("ARRAY['ropa','algodón']"),
        brand: 'FashionBrand',
        sku: 'FB456',
        weight: 300,
        warranty_information: 'Sin garantía',
        shipping_information: 'Envío estándar',
        availability_status: 'in_stock',
        return_policy: '15 días para devoluciones',
        minimum_order_quantity: 1,
        thumbnail: 'http://url.com/camiseta.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};
