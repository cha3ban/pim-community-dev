<?php

namespace Pim\Bundle\ImportExportBundle\Normalizer;

use Pim\Bundle\CatalogBundle\Entity\ProductAttribute;

/**
 * A normalizer to transform a ProductAttribute entity into a flat array
 *
 * @author    Filips Alpe <filips@akeneo.com>
 * @copyright 2013 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class FlatAttributeNormalizer extends AttributeNormalizer
{
    const LOCALIZABLE_PATTERN = '{locale}:{value}';
    const ITEM_SEPARATOR      = ',';
    const GROUP_SEPARATOR     = '|';
    const GLOBAL_SCOPE        = 'Global';
    const CHANNEL_SCOPE       = 'Channel';
    const ALL_LOCALES         = 'All';

    /**
     * @var array
     */
    protected $supportedFormats = array('csv');

    /**
     * Normalize the label
     *
     * @param ProductAttribute $attribute
     *
     * @return array
     */
    protected function normalizeLabel(ProductAttribute $attribute)
    {
        $values = array();
        foreach ($attribute->getTranslations() as $translation) {
            $values[sprintf('label-%s', $translation->getLocale())] = $translation->getLabel();
        }

        return $values;
    }

    /**
     * Normalize available locales
     *
     * @param ProductAttribute $attribute
     *
     * @return string
     */
    protected function normalizeAvailableLocales($attribute)
    {
        $availableLocales = $attribute->getAvailableLocales();

        if ($availableLocales) {
            $availableLocales = $availableLocales->map(
                function ($locale) {
                    return $locale->getCode();
                }
            )->toArray();
            $availableLocales = implode(self::ITEM_SEPARATOR, $availableLocales);
        }

        return $availableLocales ?: self::ALL_LOCALES;
    }

    /**
     * Normalize options
     *
     * @param ProductAttribute $attribute
     *
     * @return string
     */
    protected function normalizeOptions($attribute)
    {
        $options = $attribute->getOptions();

        if ($options->isEmpty()) {
            $options = '';
        } else {
            $data = array();
            foreach ($options as $option) {
                $item = array();
                foreach ($option->getOptionValues() as $value) {
                    $label = str_replace('{locale}', $value->getLocale(), self::LOCALIZABLE_PATTERN);
                    $label = str_replace('{value}', $value->getValue(), $label);
                    $item[] = $label;
                }
                $data[] = 'Code:'.$option->getCode().self::ITEM_SEPARATOR.implode(self::ITEM_SEPARATOR, $item);
            }
            $options = implode(self::GROUP_SEPARATOR, $data);
        }

        return $options;
    }

    /**
     * Normalize default options
     *
     * @param ProductAttribute $attribute
     *
     * @return string
     */
    protected function normalizeDefaultOptions($attribute)
    {
        $defaultOptions = $attribute->getDefaultOptions();

        if ($defaultOptions->isEmpty()) {
            $defaultOptions = '';
        } else {
            $data = array();
            foreach ($defaultOptions as $option) {
                $item = array();
                foreach ($option->getOptionValues() as $value) {
                    $label = str_replace('{locale}', $value->getLocale(), self::LOCALIZABLE_PATTERN);
                    $label = str_replace('{value}', $value->getValue(), $label);
                    $item[] = $label;
                }
                $data[] = implode(self::ITEM_SEPARATOR, $item);
            }
            $defaultOptions = implode(self::GROUP_SEPARATOR, $data);
        }

        return $defaultOptions;
    }
}
