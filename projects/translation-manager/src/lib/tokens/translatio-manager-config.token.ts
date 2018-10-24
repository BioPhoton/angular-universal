import {InjectionToken} from '@angular/core';
import {TranslationManagerConfig} from '../interfaces/translation-manager-config.interface';

export const TRANSLATION_MANAGER_CONFIG_TOKEN = new InjectionToken<TranslationManagerConfig>('TranslationManagerConfigToken');
