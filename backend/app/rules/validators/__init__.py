from app.rules.validators.required_field import RequiredFieldValidator
from app.rules.validators.regex_validator import RegexValidator
from app.rules.validators.numeric_range import NumericRangeValidator
from app.rules.validators.date_validator import DateValidator
from app.rules.validators.text_pattern import TextPatternValidator
from app.rules.validators.conditional import ConditionalValidator
from app.rules.validators.quantity_format import QuantityFormatValidator
from app.rules.validators.price_format import PriceFormatValidator
from app.rules.validators.font_size import FontSizeValidator
from app.rules.validators.custom import CustomValidator
from app.models.rule import RuleType

ValidatorRegistry = {
    RuleType.REQUIRED: RequiredFieldValidator(),
    RuleType.REGEX: RegexValidator(),
    RuleType.NUMERIC_RANGE: NumericRangeValidator(),
    RuleType.DATE_RELATION: DateValidator(),
    RuleType.TEXT_PATTERN: TextPatternValidator(),
    RuleType.CONDITIONAL: ConditionalValidator(),
    RuleType.QUANTITY_FORMAT: QuantityFormatValidator(),
    RuleType.PRICE_FORMAT: PriceFormatValidator(),
    RuleType.FONT_SIZE: FontSizeValidator(),
    RuleType.CUSTOM: CustomValidator(),
}
