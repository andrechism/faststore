import { Locator, Section } from '@vtex/client-cms'
import type { ComponentType } from 'react'
import { PropsWithChildren, lazy } from 'react'
import CUSTOM_COMPONENTS from 'src/customizations/src/components'
import { PageContentType, getPage } from 'src/server/cms'

import Toast from 'src/components/common/Toast'
import RenderSections from './RenderSections'

import { OverriddenDefaultAlert as Alert } from 'src/components/sections/Alert/OverriddenDefaultAlert'
import { OverriddenDefaultNavbar as Navbar } from 'src/components/sections/Navbar/OverriddenDefaultNavbar'
import { OverriddenDefaultRegionBar as RegionBar } from 'src/components/sections/RegionBar/OverriddenDefaultRegionBar'
import Footer from 'src/components/sections/Footer'

const RegionModal = lazy(() => import('src/components/region/RegionModal'))
const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))

export const GLOBAL_SECTIONS_CONTENT_TYPE = 'globalSections'

export type GlobalSectionsData = {
  sections: Section[]
}

/* A list of components that can be used in the CMS. */
const COMPONENTS: Record<string, ComponentType<any>> = {
  Alert,
  Navbar,
  RegionBar,
  RegionModal,
  CartSidebar,
  Footer,
  ...CUSTOM_COMPONENTS,
}

function GlobalSections({
  children,
  ...otherProps
}: PropsWithChildren<GlobalSectionsData>) {
  return (
    <RenderSections components={COMPONENTS} {...otherProps}>
      <Toast />

      <main>{children}</main>
    </RenderSections>
  )
}

export default GlobalSections

export const getGlobalSectionsData = async (
  previewData: Locator
): Promise<GlobalSectionsData> => {
  const { sections } = await getPage<PageContentType>({
    ...(previewData?.contentType === GLOBAL_SECTIONS_CONTENT_TYPE &&
      previewData),
    contentType: GLOBAL_SECTIONS_CONTENT_TYPE,
  })

  return { sections }
}
