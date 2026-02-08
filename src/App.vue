<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from './components/AppButton.vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import ColumnLayout from './components/ColumnLayout.vue'
import ContentCard from './components/ContentCard.vue'
import { useHashScroll } from './composables/useHashScroll'

const ACTIVE_LOCK_RELEASE_THRESHOLD = 220
const HEADER_SCROLL_OFFSET = 112

const headerLinks = [
  {
    labelKey: 'header.home',
    hash: 'home',
  },
  {
    labelKey: 'header.work',
    hash: 'work',
  },
  {
    labelKey: 'header.writing',
    hash: 'writing',
  },
  {
    labelKey: 'header.contact',
    hash: 'contact',
  },
] as const

const howIWorkItemKeys = [
  'sections.howIWork.items.0',
  'sections.howIWork.items.1',
  'sections.howIWork.items.2',
  'sections.howIWork.items.3',
  'sections.howIWork.items.4',
] as const

const primaryImpactKeys = ['sections.work.primary.impacts.0', 'sections.work.primary.impacts.1'] as const
const primaryDecisionKeys = ['sections.work.primary.decisions.0', 'sections.work.primary.decisions.1'] as const
const secondaryImpactKeys = ['sections.work.secondary.impacts.0', 'sections.work.secondary.impacts.1'] as const
const secondaryDecisionKeys = ['sections.work.secondary.decisions.0', 'sections.work.secondary.decisions.1'] as const
const frontendSkillKeys = ['sections.skills.frontend.items.0', 'sections.skills.frontend.items.1', 'sections.skills.frontend.items.2'] as const
const backendSkillKeys = [
  'sections.skills.backendTooling.items.0',
  'sections.skills.backendTooling.items.1',
  'sections.skills.backendTooling.items.2',
] as const

const { t } = useI18n()

const links = computed(() =>
  headerLinks.map((link) => ({
    hash: link.hash,
    label: t(link.labelKey),
  })),
)

const { activeHash, onHashClick } = useHashScroll({
  trackedHashes: headerLinks.map((link) => link.hash),
  offset: HEADER_SCROLL_OFFSET,
  lockReleaseThreshold: ACTIVE_LOCK_RELEASE_THRESHOLD,
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-lime-50 text-black">
    <AppHeader :links="links" :active-hash="activeHash" :on-hash-click="onHashClick" />

    <main class="mx-auto w-full max-w-6xl flex-1 px-6 pb-10 pt-32 sm:pb-14 sm:pt-36">
      <ColumnLayout :columns="12" gap-class="gap-6">
        <div class="relative sm:col-span-12">
          <ContentCard
            id="home"
            :title="t('sections.hero.role')"
            :body="t('sections.hero.paragraph')"
            :eyebrow="t('profile.name')"
            heading-tag="h1"
            body-width-class="max-w-3xl"
            padding-class="p-6 sm:p-10"
            border-variant="strong"
          >
            <p class="type-declaration type-declaration-support mt-4 max-w-4xl border-t border-black pt-4">
              {{ t('sections.hero.headline') }}
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <AppButton
                href="#contact"
                @click="onHashClick('contact')($event)"
              >
                {{ t('sections.hero.actions.contact') }}
              </AppButton>

              <AppButton
                href="https://www.linkedin.com/in/omelodev/"
                target="_blank"
              >
                {{ t('sections.hero.actions.resume') }}
              </AppButton>
            </div>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -right-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            01 {{ t('header.home') }}
          </p>
        </div>

        <div class="relative sm:col-span-8 sm:col-start-1">
          <ContentCard
            id="how-i-work"
            :title="t('sections.howIWork.title')"
            body=""
            border-variant="dashed"
            padding-class="p-6 sm:p-8"
          >
            <ul class="type-evidence mt-5 space-y-2 border-t border-black pt-5">
              <li v-for="itemKey in howIWorkItemKeys" :key="itemKey">- {{ t(itemKey) }}</li>
            </ul>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -right-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            02 {{ t('sections.howIWork.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-8 sm:col-start-5">
          <ContentCard
            id="ai-leverage"
            :title="t('sections.aiLeverage.title')"
            body=""
            border-variant="dashed"
            padding-class="p-6 sm:p-8"
          >
            <ul class="type-evidence mt-5 space-y-3 border-t border-black pt-5">
              <li><span class="type-evidence-label">{{ t('sections.aiLeverage.usedLabel') }}:</span> {{ t('sections.aiLeverage.used') }}</li>
              <li>
                <span class="type-evidence-label">{{ t('sections.aiLeverage.notTrustedLabel') }}:</span>
                {{ t('sections.aiLeverage.notTrusted') }}
              </li>
              <li>
                <span class="type-evidence-label">{{ t('sections.aiLeverage.validatedLabel') }}:</span>
                {{ t('sections.aiLeverage.validated') }}
              </li>
            </ul>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -left-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            03 {{ t('sections.aiLeverage.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-8 sm:col-start-1">
          <ContentCard
            id="work"
            :title="t('sections.work.primary.title')"
            :body="t('sections.work.primary.context')"
            padding-class="p-6 sm:p-8"
            border-variant="solid"
          >
            <template #title>
              <span class="block text-xl sm:text-2xl">
                {{ t('sections.work.primary.title') }}
              </span>
            </template>

            <div class="mt-6 grid grid-cols-1 gap-6 border-t border-black pt-6 sm:grid-cols-2">
              <div>
                <p class="type-evidence-label">{{ t('sections.work.labels.impact') }}</p>
                <ul class="type-evidence mt-3 space-y-2">
                  <li v-for="itemKey in primaryImpactKeys" :key="itemKey">- {{ t(itemKey) }}</li>
                </ul>
              </div>

              <div>
                <p class="type-evidence-label">{{ t('sections.work.labels.decisions') }}</p>
                <ul class="type-evidence mt-3 space-y-2">
                  <li v-for="itemKey in primaryDecisionKeys" :key="itemKey">- {{ t(itemKey) }}</li>
                </ul>
              </div>
            </div>

            <AppButton
              href="#writing"
              variant="ghost"
              class="mt-6"
              @click="onHashClick('writing')($event)"
            >
              {{ t('sections.work.deepDive') }}
            </AppButton>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -right-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            04 {{ t('sections.work.primary.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-8 sm:col-start-5">
          <ContentCard
            id="work-secondary"
            :title="t('sections.work.secondary.title')"
            :body="t('sections.work.secondary.context')"
            padding-class="p-6 sm:p-8"
            border-variant="solid"
          >
            <template #title>
              <span class="block text-xl sm:text-2xl">
                {{ t('sections.work.secondary.title') }}
              </span>
            </template>

            <div class="mt-6 grid grid-cols-1 gap-6 border-t border-black pt-6 sm:grid-cols-2">
              <div>
                <p class="type-evidence-label">{{ t('sections.work.labels.impact') }}</p>
                <ul class="type-evidence mt-3 space-y-2">
                  <li v-for="itemKey in secondaryImpactKeys" :key="itemKey">- {{ t(itemKey) }}</li>
                </ul>
              </div>

              <div>
                <p class="type-evidence-label">{{ t('sections.work.labels.decisions') }}</p>
                <ul class="type-evidence mt-3 space-y-2">
                  <li v-for="itemKey in secondaryDecisionKeys" :key="itemKey">- {{ t(itemKey) }}</li>
                </ul>
              </div>
            </div>

            <AppButton
              href="#writing"
              variant="ghost"
              class="mt-6"
              @click="onHashClick('writing')($event)"
            >
              {{ t('sections.work.deepDive') }}
            </AppButton>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -left-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            05 {{ t('sections.work.secondary.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-6 sm:col-start-1">
          <ContentCard
            id="work-contribution"
            :title="t('sections.work.contribution.title')"
            :body="t('sections.work.contribution.body')"
            border-variant="solid"
            padding-class="p-6 sm:p-8"
          />
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -right-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            06 {{ t('sections.work.contribution.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-8 sm:col-start-1">
          <ContentCard
            id="skills"
            :title="t('sections.skills.title')"
            body=""
            border-variant="solid"
            padding-class="p-6 sm:p-8"
          >
            <div class="mt-6 grid grid-cols-1 gap-6 border-t border-black pt-6 sm:grid-cols-2">
              <div>
                <p class="type-evidence-label">{{ t('sections.skills.frontend.title') }}</p>
                <ul class="type-evidence mt-3 space-y-2">
                  <li v-for="itemKey in frontendSkillKeys" :key="itemKey">- {{ t(itemKey) }}</li>
                </ul>
              </div>

              <div>
                <p class="type-evidence-label">{{ t('sections.skills.backendTooling.title') }}</p>
                <ul class="type-evidence mt-3 space-y-2">
                  <li v-for="itemKey in backendSkillKeys" :key="itemKey">- {{ t(itemKey) }}</li>
                </ul>
              </div>
            </div>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -right-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            07 {{ t('sections.skills.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-6 sm:col-start-7">
          <ContentCard
            id="writing"
            :title="t('sections.writing.title')"
            :body="t('sections.writing.body')"
            border-variant="solid"
            padding-class="p-6 sm:p-8"
          >
            <AppButton
              href="/writing"
              variant="ghost"
              class="mt-5"
            >
              {{ t('sections.writing.link') }}
            </AppButton>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -left-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            08 {{ t('sections.writing.title') }}
          </p>
        </div>

        <div class="relative sm:col-span-12">
          <ContentCard
            id="contact"
            :title="t('sections.footer.nameYear', { year: currentYear })"
            :body="t('sections.footer.locationTimezone')"
            border-variant="solid"
            padding-class="p-6 sm:p-8"
            heading-tag="h3"
            body-width-class="max-w-full"
          >
            <div class="type-action mt-5 border-t border-black pt-5">
              <a href="mailto:hello@omelodev.com" class="border-b border-black pb-0.5">
                {{ t('sections.footer.links.email') }}
              </a>
              <span class="mx-2">/</span>
              <a href="https://www.linkedin.com/in/omelodev/" target="_blank" rel="noreferrer" class="border-b border-black pb-0.5">
                {{ t('sections.footer.links.linkedin') }}
              </a>
              <span class="mx-2">/</span>
              <a href="https://github.com/omelodev" target="_blank" rel="noreferrer" class="border-b border-black pb-0.5">
                {{ t('sections.footer.links.github') }}
              </a>
            </div>
          </ContentCard>
          <p
            aria-hidden="true"
            class="type-identity pointer-events-none absolute top-6 -right-10 hidden [writing-mode:vertical-rl] text-lime-900/35 sm:block"
          >
            09 {{ t('header.contact') }}
          </p>
        </div>
      </ColumnLayout>
    </main>

    <AppFooter />
  </div>
</template>
