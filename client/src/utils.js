// Modified to test Lazada product
const urlRegex = /^((http[s]?):\/)?\/?www\.lazada\.vn\/[\-\w\.]+$/

export function testUrl(url) {
  return urlRegex.test(url);
}

function getTextFromQuery($, query) {
  const result = $(query).map(function() {
    return $(this).text();
  }).get();
  if (result.length === 0) {
    throw new Error('No result!');
  }
  return result;
}

function getPhoneName($) {
  return $('#prod_title').text().trim().split(' - ')[0];
}

function getPhoneImg($) {
  return $('meta[property="og:image"]').attr('content');
}

function formatDotThousand(num) {
  return num.toString().replace(/(?=(\d{3})+(?!\d))/g, '.');
}

function getPhonePrice($) {
  const specialPrice = $('#special_price_box').text();
  const currency = $('#special_currency_box').text();
  if (specialPrice) {
    return `${specialPrice} ${currency}`;
  }
  const prodPrice = $('#product_price').text();
  return `${formatDotThousand(prodPrice)} ${currency}`;
}

export function parsePhoneData($) {
  const titles = getTextFromQuery($, 'table.specification-table td:first-child');
  const values = getTextFromQuery($, 'table.specification-table td:last-child');
  const data = titles.map(function(title, index) {
    return { title, value: values[index] };
  });
  data.unshift(
    { title: 'Name', value: getPhoneName($) },
    { title: 'Image', value: getPhoneImg($) },
    { title: 'Price', value: getPhonePrice($) }
  );
  return data;
}

export function combineSpec(specA, specB) {
  const result = [];
  specA.forEach(({ title, value }) => {
    result.push({ title, valueA: value, valueB: '-' });
  });
  specB.forEach(({ title, value }) => {
    const existSpec = result.find((spec) => spec.title === title);
    if (existSpec) {
      existSpec.valueB = value;
    } else {
      result.push({ title, valueA: '-', valueB: value });
    }
  });
  return result;
}
