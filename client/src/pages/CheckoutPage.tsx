import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, CheckCircle2, CreditCard, Wallet } from 'lucide-react'
import { useCart } from '@/context/cart-context'

type PaymentMethod = 'paypal' | 'klarna'

interface FormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  zip: string
  country: string
}

interface FormErrors { [key: string]: string }

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.email.trim()) errors.email = 'E-Mail ist erforderlich'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Ungültige E-Mail-Adresse'
  if (!data.firstName.trim()) errors.firstName = 'Vorname ist erforderlich'
  else if (data.firstName.trim().length < 2) errors.firstName = 'Mindestens 2 Zeichen'
  if (!data.lastName.trim()) errors.lastName = 'Nachname ist erforderlich'
  else if (data.lastName.trim().length < 2) errors.lastName = 'Mindestens 2 Zeichen'
  if (!data.address.trim()) errors.address = 'Adresse ist erforderlich'
  else if (data.address.trim().length < 5) errors.address = 'Bitte vollständige Adresse eingeben'
  if (!data.city.trim()) errors.city = 'Stadt ist erforderlich'
  if (!data.zip.trim()) errors.zip = 'PLZ ist erforderlich'
  else if (!/^\d{4,6}$/.test(data.zip.replace(/\s/g, ''))) errors.zip = 'Ungültige Postleitzahl'
  if (!data.country.trim()) errors.country = 'Land ist erforderlich'
  return errors
}

function Field({ label, name, type = 'text', value, error, placeholder, onChange, onBlur }: {
  label: string; name: string; type?: string; value: string; error?: string
  placeholder?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: (n: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium uppercase tracking-wide text-foreground/60">{label}</label>
      <input
        type={type} name={name} value={value} placeholder={placeholder}
        onChange={onChange} onBlur={() => onBlur(name)}
        className={`h-11 rounded-xl border bg-background px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 ${error ? 'border-destructive' : 'border-border focus:border-primary'}`}
      />
      {error && <p className="text-xs text-destructive">⚠ {error}</p>}
    </div>
  )
}

function SelectField({ label, name, value, error, onChange, onBlur }: {
  label: string; name: string; value: string; error?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; onBlur: (n: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium uppercase tracking-wide text-foreground/60">{label}</label>
      <select
        name={name} value={value} onChange={onChange} onBlur={() => onBlur(name)}
        className={`h-11 rounded-xl border bg-background px-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 ${error ? 'border-destructive' : 'border-border focus:border-primary'}`}
      >
        <option value="">Land auswählen</option>
        <option value="DE">Deutschland</option>
        <option value="AT">Österreich</option>
        <option value="CH">Schweiz</option>
        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        <option value="FR">Frankreich</option>
        <option value="IT">Italien</option>
        <option value="ES">Spanien</option>
        <option value="NL">Niederlande</option>
      </select>
      {error && <p className="text-xs text-destructive">⚠ {error}</p>}
    </div>
  )
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal')
  const [submitting, setSubmitting] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState<FormData>({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: '',
  })

  const errors = validate(form)
  const touchedErrors = Object.fromEntries(Object.entries(errors).filter(([k]) => touched[k]))
  const shipping = totalPrice > 0 && totalPrice < 50 ? 4.99 : 0
  const total = totalPrice + shipping

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  function handleBlur(name: string) {
    setTouched((prev) => ({ ...prev, [name]: true }))
  }
  function handleInfoSubmit() {
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])))
    if (Object.keys(errors).length === 0) {
      setStep('payment')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  async function handlePaymentSubmit() {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    setSubmitting(false)
    setStep('success')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-10 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 font-serif text-3xl font-semibold">Bestellung bestätigt!</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Vielen Dank, <strong>{form.firstName}</strong>! Eine Bestätigung wird an <strong>{form.email}</strong> gesendet.
        </p>
        <div className="mt-8 rounded-2xl border border-border/60 bg-secondary/30 p-6 text-left">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Lieferadresse</p>
          <p className="font-medium">{form.firstName} {form.lastName}</p>
          <p className="text-sm text-muted-foreground">{form.address}, {form.zip} {form.city}</p>
        </div>
        <Link to="/shop" className="mt-8 flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 transition-all">
          Weiter einkaufen
        </Link>
      </div>
    )
  }

  // ── Main ─────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

      {/* Header */}
      <div className="mb-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="size-4" /> Zurück zum Shop
        </Link>
        <h1 className="mt-4 font-serif text-3xl font-semibold">Kasse</h1>
        <div className="mt-5 flex items-center gap-2">
          {['info', 'payment'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="size-4 text-muted-foreground" />}
              <div className={`flex items-center gap-2 text-sm font-medium ${step === s ? 'text-primary' : 'text-muted-foreground'}`}>
                <span className={`flex size-6 items-center justify-center rounded-full text-xs font-semibold ${step === s ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {i + 1}
                </span>
                {i === 0 ? 'Kontakt & Adresse' : 'Zahlung'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

        {/* ── Left ──────────────────────────────────────────────────────── */}
        <div>
          {step === 'info' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h2 className="mb-5 font-serif text-lg font-semibold">Kontaktdaten</h2>
                <Field label="E-Mail-Adresse" name="email" type="email" value={form.email} error={touchedErrors.email} placeholder="deine@email.com" onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h2 className="mb-5 font-serif text-lg font-semibold">Lieferadresse</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Vorname" name="firstName" value={form.firstName} error={touchedErrors.firstName} placeholder="Max" onChange={handleChange} onBlur={handleBlur} />
                    <Field label="Nachname" name="lastName" value={form.lastName} error={touchedErrors.lastName} placeholder="Mustermann" onChange={handleChange} onBlur={handleBlur} />
                  </div>
                  <Field label="Straße & Hausnummer" name="address" value={form.address} error={touchedErrors.address} placeholder="Musterstraße 12" onChange={handleChange} onBlur={handleBlur} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Postleitzahl" name="zip" value={form.zip} error={touchedErrors.zip} placeholder="10115" onChange={handleChange} onBlur={handleBlur} />
                    <Field label="Stadt" name="city" value={form.city} error={touchedErrors.city} placeholder="Berlin" onChange={handleChange} onBlur={handleBlur} />
                  </div>
                  <SelectField label="Land" name="country" value={form.country} error={touchedErrors.country} onChange={handleChange} onBlur={handleBlur} />
                </div>
              </div>
              <button onClick={handleInfoSubmit} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all">
                Weiter zur Zahlung <ChevronRight className="size-4" />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-4">
                <div className="text-sm">
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Lieferung an</p>
                  <p className="font-medium">{form.firstName} {form.lastName}</p>
                  <p className="text-muted-foreground">{form.address}, {form.zip} {form.city}</p>
                  <p className="text-muted-foreground">{form.email}</p>
                </div>
                <button onClick={() => setStep('info')} className="shrink-0 text-xs text-primary hover:underline">Ändern</button>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h2 className="mb-5 font-serif text-lg font-semibold">Zahlungsmethode</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* PayPal */}
                  <button onClick={() => setPaymentMethod('paypal')}
                    className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
                    {paymentMethod === 'paypal' && <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary"><CheckCircle2 className="size-3.5 text-white" /></span>}
                    <svg viewBox="0 0 120 32" className="h-7 w-auto">
                      <text x="0" y="24" fontFamily="Arial" fontWeight="bold" fontSize="26" fill="#003087">Pay</text>
                      <text x="46" y="24" fontFamily="Arial" fontWeight="bold" fontSize="26" fill="#009cde">Pal</text>
                    </svg>
                    <span className="text-xs text-muted-foreground">Sicher & schnell</span>
                  </button>
                  {/* Klarna */}
                  <button onClick={() => setPaymentMethod('klarna')}
                    className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${paymentMethod === 'klarna' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
                    {paymentMethod === 'klarna' && <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary"><CheckCircle2 className="size-3.5 text-white" /></span>}
                    <svg viewBox="0 0 110 32" className="h-7 w-auto">
                      <rect width="110" height="32" rx="6" fill="#FFB3C7"/>
                      <text x="12" y="23" fontFamily="Arial" fontWeight="bold" fontSize="18" fill="#000">klarna</text>
                    </svg>
                    <span className="text-xs text-muted-foreground">Jetzt kaufen, später zahlen</span>
                  </button>
                </div>

                {paymentMethod === 'paypal' && (
                  <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5">
                    <div className="mb-2 flex items-center gap-2"><Wallet className="size-4 text-blue-600" /><p className="text-sm font-medium text-blue-900">PayPal</p></div>
                    <p className="text-sm leading-relaxed text-blue-700">Du wirst zu PayPal weitergeleitet um die Zahlung sicher abzuschließen. Kein Konto nötig — auch Kreditkarte möglich.</p>
                    <p className="mt-2 text-xs text-blue-500">🔒 256-bit SSL verschlüsselt</p>
                  </div>
                )}
                {paymentMethod === 'klarna' && (
                  <div className="mt-5 rounded-xl border border-pink-100 bg-pink-50 p-5">
                    <div className="mb-2 flex items-center gap-2"><CreditCard className="size-4 text-pink-600" /><p className="text-sm font-medium text-pink-900">Klarna — Flexibel zahlen</p></div>
                    <div className="space-y-1.5 text-sm text-pink-800">
                      <p>✓ <strong>30 Tage später zahlen</strong> — erst empfangen, dann zahlen</p>
                      <p>✓ <strong>3 Raten</strong> — 3 × ${(total / 3).toFixed(2)}, zinsfrei</p>
                      <p>✓ <strong>Sofortüberweisung</strong> — direkt vom Bankkonto</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handlePaymentSubmit}
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <><svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Wird verarbeitet...</>
                ) : (
                  <>Jetzt kaufen · ${total.toFixed(2)} <ChevronRight className="size-4" /></>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Mit dem Kauf akzeptierst du unsere <a href="#" className="underline hover:text-primary">AGB</a> und <a href="#" className="underline hover:text-primary">Datenschutzerklärung</a>.
              </p>
            </div>
          )}
        </div>

        {/* ── Right: Order Summary ──────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="mb-5 font-serif text-lg font-semibold">
              Bestellung {totalItems > 0 && `(${totalItems} Artikel)`}
            </h2>

            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Keine Artikel im Warenkorb.</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img src={item.image} alt={item.name} className="size-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">{item.name}</p>
                        <p className="shrink-0 text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">Menge: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Zwischensumme</span><span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Versand</span>
                <span className={shipping === 0 ? 'font-medium text-primary' : ''}>
                  {shipping === 0 ? (totalPrice === 0 ? '—' : 'Kostenlos') : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {totalPrice > 0 && totalPrice < 50 && (
                <p className="text-xs text-muted-foreground">Kostenloser Versand ab $50</p>
              )}
              <div className="flex justify-between border-t border-border/60 pt-2 text-base font-semibold">
                <span>Gesamt</span>
                <span className="font-serif text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
              {[['🔒', 'SSL sicher'], ['↩', '30 Tage Rückgabe'], ['🚚', 'Schnelle Lieferung']].map(([icon, text]) => (
                <div key={text} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-lg">{icon}</span>
                  <span className="text-[10px] leading-tight text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}