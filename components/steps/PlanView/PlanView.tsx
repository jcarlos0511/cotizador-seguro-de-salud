/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useUser, VIEW } from '@components/context'
import { Header } from '@components/form'
import { Accordion, Card } from '@components/ui'
import { Button, Container, Flex, PlanButton, StepLink } from '@components/theme'

const PlanView = () => {
  const router = useRouter()
  const { values, view, toggleView, getFormValues } = useUser()

  const [form, setForm] = useState({ plan: 'basic' })

  // *timeout to match client with server
  useEffect(() => {
    const timeout = setTimeout(() => {
      setForm({ plan: view })
    }, 100)

    return () => clearTimeout(timeout)
  }, [view])

  useEffect(() => {
    if (!values) {
      router.push(
        {
          pathname: `/`,
        },
        undefined,
        { shallow: true },
      )
    }
  }, [values])

  // *transfom entries in an array
  const filterPlan = Object.entries({
    basic: { plan: 'básico', price: 160 },
    advanced: { plan: 'avanzado', price: 200 },
    premium: { plan: 'premium', price: 250 },
    full: { plan: 'full', price: 500 },
  })

  // *send current values and current plan
  const sendPlan = () => {
    getFormValues({ ...values, ...form })

    return router.push(
      {
        pathname: `/steps/message`,
      },
      undefined,
      { shallow: true },
    )
  }

  const handlePlanBenefits = useCallback((value: VIEW) => {
    switch (value) {
      case 'basic':
        return <Card maxCoverage={1} value={value} />

      case 'advanced':
        return <Card maxCoverage={5} value={value} />

      case 'premium':
        return <Card maxCoverage={10} value={value} />

      case 'full':
        return <Card maxCoverage={15} value={value} />

      default:
        throw new Error(`Unhandled view card`)
    }
  }, [])

  return (
    <Container>
      <StepLink number={2} href={`/steps/add?q=${values?.numDoc}`} />
      <Header
        title="Elige"
        boldTitle="tu protección"
        subTitle="Selecciona tu plan de salud ideal."
      />

      <Flex wrap="wrap">
        {filterPlan.map(([key, object]) => (
          <PlanButton
            key={key}
            handleClick={() => toggleView(key)}
            className={`${view === key ? 'active' : 'desactive'}`}
          >
            <div>
              <span>{object.plan}</span>
              <h3>
                <span>S/ </span>
                {object.price}
              </h3>
              <span>mensual</span>
            </div>
          </PlanButton>
        ))}
      </Flex>

      {handlePlanBenefits(view)}

      <div>
        <Header width="smWidth" title="Revisa nuestros" boldTitle="servicios y exclusiones" />
      </div>

      <Flex direction="column">
        <Accordion title="Servicios Brindados">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, aspernatur unde
          laborum, consequatur sed similique consequuntur nulla eum quibusdam amet eligendi earum
          cumque nihil ipsa debit,
        </Accordion>

        <Accordion title="Exclusiones">
          Lorem ipsum dolor adipisicing elit. Voluptate, aspernatur unde laborum, consequatur sed
          similique consequuntur nulla eum quibusdam amet eligendi earum cumque nihil ipsa debit,
        </Accordion>
      </Flex>

      <Flex>
        <span>enviar cotización por correo</span>

        <Button isDisabled={false} button handleClick={() => sendPlan()}>
          comprar plan
        </Button>
      </Flex>
    </Container>
  )
}

export default PlanView
