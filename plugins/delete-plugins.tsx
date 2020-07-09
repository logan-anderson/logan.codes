import * as React from 'react'
import { ActionButton, useCMS, Form, PopupModal } from 'tinacms'
export function DeleteAction({ form }: { form: Form }) {
    const cms = useCMS()
    const [active, setActive] =  React.useState(false)
    return (
    <>
      <ActionButton
        onClick={async () => {
            console.log(form)
            setActive(true)
            if (
                !confirm(
                    `Are you sure you want to delete ${form.name}?`
                    )
                    ) {
                        return
                    }
                    await cms.api.github.delete!(form.name)
                    
                    window.history.back()
                }}
                >
        Delete
      </ActionButton>
      {active && <PopupModal/> }
    </>
    )
  }
export const BranchSwitcherPlugin = {
  __type: 'toolbar:action',
  name: 'testbranch-switcher',
  weight: 1,
  component: DeleteAction,
}
