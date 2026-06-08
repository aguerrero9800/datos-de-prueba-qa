/**
 * Ejemplo de uso con Playwright.
 * Instalar: npm install -D @playwright/test
 * Ejecutar:  npx playwright test
 *
 * TODO: Reemplazar la URL de la aplicación y los selectores por los reales.
 */
import { test, expect } from '@playwright/test';
import { crearCliente } from '../../src/index';

test.describe('Registro de cliente — persona natural', () => {
  test('Argentina — formulario de registro básico', async ({ page }) => {
    const cliente = crearCliente('AR', { tipoEntidad: 'persona' });

    // TODO: Cambiar por la URL real de la aplicación
    await page.goto('https://tu-aplicacion.ejemplo.com/registro');

    await page.fill('[data-testid="nombre"]', cliente.nombre);
    await page.fill('[data-testid="apellido"]', cliente.apellido ?? '');
    await page.fill('[data-testid="email"]', cliente.email);
    await page.fill('[data-testid="documento"]', cliente.documento.numero);
    await page.fill('[data-testid="telefono"]', cliente.telefono.completo);
    await page.fill('[data-testid="direccion"]', `${cliente.direccion.calle} ${cliente.direccion.numero}`);
    await page.fill('[data-testid="codigo-postal"]', cliente.direccion.codigoPostal);

    await page.click('[data-testid="btn-registrar"]');

    await expect(page.locator('[data-testid="mensaje-exito"]')).toBeVisible();
  });

  test('Chile — registro de empresa', async ({ page }) => {
    const cliente = crearCliente('CL', { tipoEntidad: 'empresa' });

    await page.goto('https://tu-aplicacion.ejemplo.com/registro');

    await page.fill('[data-testid="razon-social"]', cliente.razonSocial ?? '');
    await page.fill('[data-testid="email"]', cliente.email);
    await page.fill('[data-testid="rut"]', cliente.documento.numero);
    await page.fill('[data-testid="telefono"]', cliente.telefono.completo);

    await page.click('[data-testid="btn-registrar"]');

    await expect(page.locator('[data-testid="mensaje-exito"]')).toBeVisible();
  });
});

test.describe('Registro de cliente — múltiples países', () => {
  const paises = ['MX', 'HN', 'GT', 'EC', 'SV', 'CR'] as const;

  for (const pais of paises) {
    test(`${pais} — registro persona natural`, async ({ page }) => {
      const cliente = crearCliente(pais, { tipoEntidad: 'persona' });

      await page.goto('https://tu-aplicacion.ejemplo.com/registro');

      await page.fill('[data-testid="nombre"]', cliente.nombre);
      await page.fill('[data-testid="email"]', cliente.email);
      await page.fill('[data-testid="documento"]', cliente.documento.numero);

      // Verificar que el campo de país se seleccionó correctamente
      await expect(page.locator('[data-testid="pais"]')).toHaveValue(cliente.pais);
    });
  }
});
