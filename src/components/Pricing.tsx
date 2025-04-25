'use client'

import { useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logomark } from '@/components/Logo'

const plans = [
  {
    name: 'Starter',
    featured: false,
    price: { Monthly: '$0', Annually: '$0' },
    description:
      'You’re new to investing but want to do it right. Get started for free.',
    button: {
      label: 'Get started for free',
      href: '/register',
    },
    features: [
      'Commission-free trading',
      'Multi-layered encryption',
      'One tip every day',
      'Invest up to $1,500 each month',
    ],
    logomarkClassName: 'fill-gray-300',
  },
  {
    name: 'Investor',
    featured: false,
    price: { Monthly: '$7', Annually: '$70' },
    description:
      'You’ve been investing for a while. Invest more and grow your wealth faster.',
    button: {
      label: 'Subscribe',
      href: '/register',
    },
    features: [
      'Commission-free trading',
      'Multi-layered encryption',
      'One tip every hour',
      'Invest up to $15,000 each month',
      'Basic transaction anonymization',
    ],
    logomarkClassName: 'fill-gray-500',
  },
  {
    name: 'VIP',
    featured: true,
    price: { Monthly: '$199', Annually: '$1,990' },
    description:
      'You’ve got a huge amount of assets but it’s not enough. To the moon.',
    button: {
      label: 'Subscribe',
      href: '/register',
    },
    features: [
      'Commission-free trading',
      'Multi-layered encryption',
      'Real-time tip notifications',
      'No investment limits',
      'Advanced transaction anonymization',
      'Automated tax-loss harvesting',
    ],
    logomarkClassName: 'fill-cyan-500',
  },
]

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Plan({
  name,
  price,
  description,
  button,
  features,
  activePeriod,
  logomarkClassName,
  featured = false,
}: {
  name: string
  price: {
    Monthly: string
    Annually: string
  }
  description: string
  button: {
    label: string
    href: string
  }
  features: Array<string>
  activePeriod: 'Monthly' | 'Annually'
  logomarkClassName?: string
  featured?: boolean
}) {
  return (
    <section
      className={clsx(
        'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5',
        featured ? 'order-first bg-gray-900 lg:order-none' : 'bg-white',
      )}
    >
      <h3
        className={clsx(
          'flex items-center text-sm font-semibold',
          featured ? 'text-white' : 'text-gray-900',
        )}
      >
        <Logomark className={clsx('h-6 w-6 flex-none', logomarkClassName)} />
        <span className="ml-4">{name}</span>
      </h3>
      <p
        className={clsx(
          'relative mt-5 flex text-3xl tracking-tight',
          featured ? 'text-white' : 'text-gray-900',
        )}
      >
        {price.Monthly === price.Annually ? (
          price.Monthly
        ) : (
          <>
            <span
              aria-hidden={activePeriod === 'Annually'}
              className={clsx(
                'transition duration-300',
                activePeriod === 'Annually' &&
                  'pointer-events-none translate-x-6 opacity-0 select-none',
              )}
            >
              {price.Monthly}
            </span>
            <span
              aria-hidden={activePeriod === 'Monthly'}
              className={clsx(
                'absolute top-0 left-0 transition duration-300',
                activePeriod === 'Monthly' &&
                  'pointer-events-none -translate-x-6 opacity-0 select-none',
              )}
            >
              {price.Annually}
            </span>
          </>
        )}
      </p>
      <p
        className={clsx(
          'mt-3 text-sm',
          featured ? 'text-gray-300' : 'text-gray-700',
        )}
      >
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            '-my-2 divide-y text-sm',
            featured
              ? 'divide-gray-800 text-gray-300'
              : 'divide-gray-200 text-gray-700',
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex py-2">
              <CheckIcon
                className={clsx(
                  'h-6 w-6 flex-none',
                  featured ? 'text-white' : 'text-cyan-500',
                )}
              />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        href={button.href}
        color={featured ? 'cyan' : 'gray'}
        className="mt-6"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        {button.label}
      </Button>
    </section>
  )
}

export function Pricing() {
  let [activePeriod, setActivePeriod] = useState<'Monthly' | 'Annually'>(
    'Monthly',
  )

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="border-t border-gray-200 bg-gray-100 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Modelo de Negócio
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            O modelo de negócio da nossa plataforma é baseado na cobrança
            recorrente e por consumo, com público tanto B2B quanto B2C.
          </p>
        </div>
        <Table />
        <div className="mx-auto mt-4 w-full pt-4 text-center">
          <p className="text-sm font-semibold text-gray-800">
            Custos de Transcrição por Hora:
          </p>
          <p className="text-sm text-gray-600">US$ 0,016 por hora</p>
          <p className="text-sm text-gray-600">
            {' '}
            R$ 0,016 × 5,68 = R$ 0,09088 por hora ou seja,{' '}
          </p>
          <p className="text-sm text-gray-600 font-semibold">~9 centavos por hora de áudio</p>
        </div>
        <div className="mt-8 w-full max-w-7xl px-4 text-lg text-gray-800 lg:px-8 flex flex-col items-center">
          <span className="font-semibold text-gray-800">Público-Alvo:</span>
            <p>Ensino Médio, Técnico, Superior e Pós</p>
            <p>Instituições de ensino e eventos educacionais</p>
            <p>Universidades públicas e privadas</p>
            <p>Escolas técnicas</p>
            <p>Plataformas EAD</p>
            <p>
              Organizadores de congressos, simpósios e seminários acessíveis
            </p>
        </div>
      </Container>
    </section>
  )
}

function Table() {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th
                  scope="col"
                  className="py-3.5 pr-4 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Segmento
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Proposta de Valor
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Modelo de Receita
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-4 pl-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Observações técnicas
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="divide-x divide-gray-200">
                <td className="py-4 pr-4 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                  B2B
                </td>
                <td className="p-4 text-sm whitespace-nowrap text-gray-500">
                  Acesso gratuito com limites (ex: 2h/mês)
                </td>
                <td className="p-4 text-sm whitespace-nowrap text-gray-500">
                  Freemium + Pagamento por uso
                </td>
                <td className="py-4 pr-4 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pr-0">
                  Cobrança via cartão ou Pix, via app
                </td>
              </tr>
              <tr className="divide-x divide-gray-200">
                <td className="py-4 pr-4 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                  B2C
                </td>
                <td className="p-4 text-sm whitespace-nowrap text-gray-500">
                  Licença institucional
                </td>
                <td className="p-4 text-sm whitespace-nowrap text-gray-500">
                  Licenciamento anual ou por aluno/mês
                </td>
                <td className="py-4 pr-4 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pr-0">
                  Acesso personalizado com API/portal
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
