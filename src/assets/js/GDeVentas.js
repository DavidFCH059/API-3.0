let sales = [
    { id: 23123, clientName: 'Paola Cetre', date: '23/04/2024', totalAmount: 70000, status: 'Entregado', products: [
        { barCode: '001', productName: 'Producto A', quantity: 2, price: 25000 },
        { barCode: '002', productName: 'Producto B', quantity: 1, price: 20000 }
    ]}
];

let currentSale = null;
let products = [];
let dataTable;

document.addEventListener('DOMContentLoaded', () => {
    const createSaleButton = document.getElementById('createSaleButton');
    const createClientButton = document.getElementById('createClientButton');
    const saleFormModal = new bootstrap.Modal(document.getElementById('saleFormModal'));
    const returnModal = new bootstrap.Modal(document.getElementById('returnModal'));
    const cancelSaleButton = document.getElementById('cancelSaleButton');
    const saleForm = document.getElementById('saleForm');
    const addProductButton = document.getElementById('addProductButton');
    const downloadExcelButton = document.getElementById('downloadExcelButton');
    const searchButton = document.getElementById('searchButton');

    createSaleButton.addEventListener('click', () => saleFormModal.show());
    createClientButton.addEventListener('click', () => {
        Swal.fire({
            title: '¿Desea crear un nuevo cliente?',
            text: 'Será redirigido al módulo de clientes.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, crear',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/modulo-clientes.html';
            }
        });
    });
    cancelSaleButton.addEventListener('click', () => saleFormModal.hide());
    saleForm.addEventListener('submit', handleSaleSubmit);
    addProductButton.addEventListener('click', addProduct);
    downloadExcelButton.addEventListener('click', downloadExcel);
    searchButton.addEventListener('click', searchSales);

    initializeDataTable();
    initializeReturnReasonOptions();
});

function initializeDataTable() {
    dataTable = $('#salesTable').DataTable({
        data: sales,
        columns: [
            { data: 'id' },
            { data: 'clientName' },
            { data: 'date' },
            { data: 'totalAmount' },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button onclick="viewSaleDetails(${row.id})" class="btn btn-info btn-sm">Ver detalle</button>
                        <button onclick="printReceipt(${row.id})" class="btn btn-secondary btn-sm">Imprimir</button>
                        <button onclick="goToReturn(${row.id})" class="btn btn-warning btn-sm">Ir a devolución</button>
                        <button onclick="cancelSale(${row.id})" class="btn btn-danger btn-sm">Anular</button>
                    `;
                }
            }
        ],
        responsive: true
    });
}

function updateSalesTable() {
    dataTable.clear().rows.add(sales).draw();
}

function handleSaleSubmit(event) {
    event.preventDefault();
    const clientName = document.getElementById('clientName').value;
    const totalAmount = calculateTotalAmount();

    const newSale = {
        id: Date.now(),
        clientName,
        date: new Date().toLocaleDateString(),
        totalAmount,
        status: 'Pendiente',
        products // Add the products list to the new sale
    };

    sales.push(newSale);
    updateSalesTable();
    bootstrap.Modal.getInstance(document.getElementById('saleFormModal')).hide();
    document.getElementById('saleForm').reset();
    products = [];
    updateProductList();

    Swal.fire({
        icon: 'success',
        title: 'Venta registrada',
        text: 'La venta se ha registrado correctamente.'
    });
}

function addProduct() {
    const barCode = document.getElementById('barCode').value;
    const productName = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    if (productName && quantity && price) {
        products.push({ barCode, productName, quantity, price });
        updateProductList();
        calculateTotalAmount();
        
        // Clear input fields
        document.getElementById('barCode').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('price').value = '';

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: 'El producto se ha agregado a la venta.'
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos del producto.'
        });
    }
}

function updateProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item mb-2';
        productDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${product.productName} - Cantidad: ${product.quantity} - Precio: ${product.price}</span>
                <button onclick="removeProduct(${index})" class="btn btn-danger btn-sm">Eliminar</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

function removeProduct(index) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "¿Desea eliminar este producto de la venta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            products.splice(index, 1);
            updateProductList();
            calculateTotalAmount();
            Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado de la venta.',
                'success'
            );
        }
    });
}

function calculateTotalAmount() {
    const total = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    document.getElementById('totalPrice').value = total.toFixed(2);
    return total;
}

function viewSaleDetails(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
        let productsHtml = sale.products.map(p => 
            <p>${p.productName} - Cantidad: ${p.quantity} - Precio: ${p.price}</p>
        ).join('');

        Swal.fire({
            title: 'Detalles de la venta',
            html: `
                <p><strong>ID:</strong> ${sale.id}</p>
                <p><strong>Cliente:</strong> ${sale.clientName}</p>
                <p><strong>Fecha:</strong> ${sale.date}</p>
                <p><strong>Monto total:</strong> ${sale.totalAmount}</p>
                <p><strong>Estado:</strong> ${sale.status}</p>
                <h4>Productos:</h4>
                ${productsHtml}
            `,
            icon: 'info'
        });
    }
}

function printReceipt(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
        let receiptContent = `
            <h2>Recibo de Venta</h2>
            <p><strong>ID de Venta:</strong> ${sale.id}</p>
            <p><strong>Cliente:</strong> ${sale.clientName}</p>
            <p><strong>Fecha:</strong> ${sale.date}</p>
            <h3>Productos:</h3>
            <ul>
                ${sale.products.map(p => <li>${p.productName} - Cantidad: ${p.quantity} - Precio: ${p.price}</li>).join('')}
            </ul>
            <p><strong>Total:</strong> ${sale.totalAmount}</p>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Recibo de Venta</title></head><body>');
        printWindow.document.write(receiptContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}

function goToReturn(saleId) {
    const sale = sales.find(s => s.id === saleId);
    if (sale) {
        currentSale = sale;
        document.getElementById('returnClientName').value = sale.clientName;
        document.getElementById('returnSaleDate').value = sale.date;
        document.getElementById('returnTotalAmount').value = sale.totalAmount;
        document.getElementById('returnProductList').innerHTML = '';
        document.getElementById('returnTotalRefund').value = '0.00';
        const returnModal = new bootstrap.Modal(document.getElementById('returnModal'));
        returnModal.show();
    }
}

function cancelSale(saleId) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "¿Desea anular esta venta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, anular',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const saleIndex = sales.findIndex(s => s.id === saleId);
            if (saleIndex !== -1) {
                sales[saleIndex].status = 'Anulado';
                updateSalesTable();
                Swal.fire(
                    'Anulado',
                    'La venta ha sido anulada.',
                    'success'
                );
            }
        }
    });
}

function downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(sales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    XLSX.writeFile(workbook, "reporte_ventas.xlsx");
}

function searchSales() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredSales = sales.filter(sale => 
        sale.clientName.toLowerCase().includes(searchTerm) ||
        sale.id.toString().includes(searchTerm) ||
        sale.date.includes(searchTerm) ||
        sale.status.toLowerCase().includes(searchTerm)
    );
    dataTable.clear().rows.add(filteredSales).draw();
}

function initializeReturnReasonOptions() {
    const returnReasonOptions = document.querySelectorAll('.return-reason-option');
    returnReasonOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            updateReturnReason();
        });
    });

    const addCustomReasonButton = document.getElementById('addCustomReasonButton');
    addCustomReasonButton.addEventListener('click', addCustomReason);

    const addReturnProductButton = document.getElementById('addReturnProductButton');
    addReturnProductButton.addEventListener('click', addReturnProduct);

    const confirmReturnButton = document.getElementById('confirmReturnButton');
    confirmReturnButton.addEventListener('click', confirmReturn);
}

function updateReturnReason() {
    const selectedReasons = Array.from(document.querySelectorAll('.return-reason-option.selected'))
        .map(option => option.dataset.reason);
    document.getElementById('returnReason').value = selectedReasons.join(', ');
}

function addCustomReason() {
    Swal.fire({
        title: 'Agregar motivo personalizado',
        input: 'text',
        inputPlaceholder: 'Ingrese el motivo',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Debe ingresar un motivo';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const customReason = result.value;
            const returnReasonOptions = document.querySelector('.return-reason-options');
            const newOption = document.createElement('div');
            newOption.className = 'return-reason-option';
            newOption.dataset.reason = customReason;
            newOption.textContent = customReason;
            newOption.addEventListener('click', function() {
                this.classList.toggle('selected');
                updateReturnReason();
            });
            returnReasonOptions.appendChild(newOption);
        }
    });
}

function addReturnProduct() {
    const productName = document.getElementById('returnProductName').value;
    const quantity = parseInt(document.getElementById('returnQuantity').value);
    const price = parseFloat(document.getElementById('returnPrice').value);

    if (productName && quantity && price) {
        const returnProductList = document.getElementById('returnProductList');
        const productDiv = document.createElement('div');
        productDiv.className = 'return-product-item mb-2';
        productDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${productName} - Cantidad: ${quantity} - Precio: ${price}</span>
                <button onclick="removeReturnProduct(this)" class="btn btn-danger btn-sm">Eliminar</button>
            </div>
        `;
        returnProductList.appendChild(productDiv);

        // Clear input fields
        document.getElementById('returnProductName').value = '';
        document.getElementById('returnQuantity').value = '';
        document.getElementById('returnPrice').value = '';

        updateReturnTotalRefund();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos del producto a devolver.'
        });
    }
}

function removeReturnProduct(button) {
    button.closest('.return-product-item').remove();
    updateReturnTotalRefund();
}

function updateReturnTotalRefund() {
    const returnProducts = document.querySelectorAll('.return-product-item');
    let totalRefund = 0;
    returnProducts.forEach(product => {
        const productInfo = product.querySelector('span').textContent;
        const price = parseFloat(productInfo.split('Precio: ')[1]);
        const quantity = parseInt(productInfo.split('Cantidad: ')[1].split(' -')[0]);
        totalRefund += price * quantity;
    });
    document.getElementById('returnTotalRefund').value = totalRefund.toFixed(2);
}

function confirmReturn() {
    const returnReason = document.getElementById('returnReason').value;
    const totalRefund = document.getElementById('returnTotalRefund').value;

    if (!returnReason) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, seleccione al menos un motivo de devolución.'
        });
        return;
    }

    if (parseFloat(totalRefund) === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay productos para devolver.'
        });
        return;
    }

    Swal.fire({
        title: '¿Confirmar devolución?',
        text: 'Monto a devolver: ${totalRefund}',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí iría la lógica para procesar la devolución
            Swal.fire(
                'Devolución confirmada',
                'La devolución se ha procesado correctamente.',
                'success'
            );
            bootstrap.Modal.getInstance(document.getElementById('returnModal')).hide();
        }
    });
}