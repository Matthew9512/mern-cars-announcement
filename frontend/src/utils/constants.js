export const productionYearsArr = [
   { option: 'Year', key: '' },
   { option: '2023', key: '2023' },
   { option: '2022', key: '2022' },
   { option: '2021', key: '2021' },
   { option: '2020', key: '2020' },
   { option: '2019', key: '2019' },
   { option: '2018', key: '2018' },
   { option: '2017', key: '2017' },
   { option: '2016', key: '2016' },
   { option: '2015', key: '2015' },
];

export const fuelsArr = [
   {
      option: 'Fuel',
      key: '',
   },
   {
      option: 'Diesel',
      key: 'diesel',
   },
   {
      option: 'Gas',
      key: 'gas',
   },
   {
      option: 'Electricity',
      key: 'electricity',
   },
];

export const carBodyTypesArr = [
   {
      option: 'Body Type',
      key: '',
   },
   {
      option: 'Cabriolet',
      key: 'Cabriolet',
   },
   {
      option: 'Sedan',
      key: 'Sedan',
   },
   {
      option: 'Coupe',
      key: 'Coupe',
   },
   {
      option: 'SUV',
      key: 'SUV',
   },
   {
      option: 'Hatchback',
      key: 'Hatchback',
   },
   {
      option: 'Minivan',
      key: 'Minivan',
   },
   {
      option: 'Crossover',
      key: 'Crossover',
   },
   {
      option: 'Sports Car',
      key: 'Sports Car',
   },
];

export const brandsArr = [
   'Acura',
   'Alfa Romeo',
   'Aston Martin',
   'Audi',
   'Bentley',
   'BMW',
   'Buick',
   'Cadillac',
   'Chevrolet',
   'Chrysler',
   'Citroen',
   'Dodge',
   'Ferrari',
   'Fiat',
   'Ford',
   'GMC',
   'Honda',
   'Hyundai',
   'Infiniti',
   'Jaguar',
   'Jeep',
   'Kia',
   'Lamborghini',
   'Land Rover',
   'Lexus',
   'Lincoln',
   'Maserati',
   'Mazda',
   'McLaren',
   'Mercedes-Benz',
   'MINI',
   'Mitsubishi',
   'Nissan',
   'Porsche',
   'Ram',
   'Rolls-Royce',
   'Subaru',
   'Tesla',
   'Toyota',
   'Volkswagen',
   'Volvo',
];

// array for inputs inside new announcement form
export const newAnnForm = [
   {
      id: 'title',
      text: 'Announcement title:',
      type: 'text',
      placeholder: 'title',
      name: 'title',
      errorMessage: 'This field is required',
      validate: (value) =>
         value.replace(/^\s+|\s+$|\s+(?=\s)/g, '').length > 6 ? true : 'Title must be longer than 6 letters',
   },
   {
      id: 'model',
      text: 'Model of your car:',
      type: 'text',
      placeholder: 'model',
      name: 'model',
      errorMessage: 'This field is required',
      minLength: {
         value: 2,
         message: 'Model name must be longer than 2 letters',
      },
   },
   {
      id: 'price',
      text: 'Price:',
      type: 'number',
      placeholder: '€',
      name: 'price',
      errorMessage: 'This field is required',
      validate: (value) =>
         Number(value) <= 300 || Number(value) >= 2000000
            ? 'Value out of range. Accepted values 300 - 2,000,000'
            : true,
   },
   {
      id: 'engine capacity',
      text: 'Engine capacity:',
      type: 'number',
      placeholder: 'cm3',
      name: 'engineCapacity',
      errorMessage: 'This field is required',
      validate: (value) =>
         Number(value) <= 600 || Number(value) >= 7000 ? 'Value out of range. Accepted values 600 - 7000' : true,
   },
   {
      id: 'horse power',
      text: 'Horse power:',
      type: 'number',
      placeholder: 'HP',
      name: 'horsePower',
      errorMessage: 'This field is required',
      validate: (value) =>
         Number(value) <= 50 || Number(value) >= 2000 ? 'Value out of range. Accepted values 50 - 2000' : true,
   },
   {
      id: 'year',
      text: 'Production year:',
      type: 'year',
      placeholder: 'year',
      name: 'year',
      errorMessage: 'This field is required',
      validate: (value) =>
         Number(value) <= 1900 || Number(value) >= new Date().getFullYear()
            ? `Value out of range. Accepted values 1900 - ${new Date().getFullYear()}`
            : true,
   },
   {
      id: 'brand',
      text: 'Brand of your car:',
      type: 'text',
      placeholder: 'brand',
      name: 'brand',
      errorMessage: 'This field is required',
      list: 'brand-list-add',
      validate: (value) => {
         const isValidBrand = brandsArr.some((option) => option.toLowerCase() === value.toLowerCase());
         return isValidBrand || 'Please select a brand from the list';
      },
   },
];
